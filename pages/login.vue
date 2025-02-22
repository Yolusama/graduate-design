<template>
	<view id="login" v-if="!state.hasLogan">
		<uni-forms label-position="right" :rules="rules" label-align="right">
			<uni-forms-item label="电子邮箱" name="email" class="item" v-if="state.useCheckCode||state.isReg">
				<uni-easyinput type="email" v-model="state.email" maxlength="25" />
			</uni-forms-item>
			<uni-forms-item label="账户" name="email" class="item" v-if="!state.useCheckCode&&!state.isReg">
				<uni-easyinput v-model="state.account" maxlength="25" placeholder="电子邮箱/账号" />
			</uni-forms-item>
			<uni-forms-item name="password" label="密码" v-if="!state.useCheckCode||state.isReg" maxlength="20"
				class="item"> 
				<uni-easyinput type="password" v-model="state.password"  placeholder="非邮箱注册的默认密码为账号前六位"/>
			</uni-forms-item>
			<uni-forms-item label="验证码" class="item" name="checkCode" v-if="state.useCheckCode||state.isReg">
				<view class="check">
					<uni-easyinput type="text" v-model="state.checkCode" :maxlength="state.checkCodeLen"
						class="check-code">
					</uni-easyinput>
					<button size="mini" class="get-check-code" @click="getCheckCode"
						:disabled="state.hasGotCode">{{state.checkCodeText}}</button>
				</view>
			</uni-forms-item>
			<view class="btns">
				<button type="primary" @click="login" class="btn" size="mini" v-if="!state.isReg">登录</button>
				<button type="primary" @click="register" class="btn" size="mini" v-else>注册</button>
			</view>
			<view class="login-opt">
				<a @click="state.useCheckCode=true;state.isReg=false;state.checkCodeLen=4"
					v-if="!state.useCheckCode">使用验证码登录</a>
				<a @click="state.useCheckCode=false;state.isReg=false;" v-else>使用密码登录</a>
				<a @click="state.isReg = true;state.checkCodeLen=6" v-if="!state.isReg">注册</a>
				<a @click="state.isReg = false;state.checkCodeLen=6" v-else>注册</a>
			</view>
		</uni-forms>
		<uni-popup ref="bindEmailPopup" background-color="#fff" @change="popupClose">
			<view class="bind-email">
				<uni-nav-bar left-icon="arrow-left" @clickLeft="bindEmailPopup.close();"
					style="width: 100%;position: absolute;top:0" :border="false"></uni-nav-bar>
				<view>
					<uni-forms>
						<uni-forms-item label="电子邮箱" name="email" class="item">
							<uni-easyinput type="email" v-model="state.email" maxlength="25" />
						</uni-forms-item>
						<uni-forms-item label="验证码" class="item" name="checkCode">
							<view class="check">
								<uni-easyinput type="text" v-model="state.checkCode" :maxlength="state.checkCodeLen"
									class="check-code">
								</uni-easyinput>
								<button size="mini" class="get-check-code" @click="getCheckCode"
									:disabled="state.hasGotCode">{{state.checkCodeText}}</button>
							</view>
						</uni-forms-item>
						<view style="display: flex;justify-content: center;">
							<button type="primary" size="mini" @click="bindEmail">确定</button>
							<button style="color: gray;font-size: white;margin-left: 5px;" size="mini"
								@click="bindEmailPopup.close()">取消</button>
						</view>
					</uni-forms>
				</view>
			</view>
		</uni-popup>
	</view>
	<cover-image src="../static/login.gif" v-else />
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		onBeforeMount
	} from "vue";
	import {
		GetCheckCode,
		Login,
		CheckCodeLogin,
		Register,
		VerifyToken,
		formDataAuth,
		auth,
		user,
		BindEmail
	} from "../api/User";
	import {
		delayToRun,
		loading
	} from "../module/Common";

	const state = reactive({
		email: "",
		password: "",
		account: "",
		checkCode: "",
		useCheckCode: false,
		isReg: false,
		checkCodeLen: 4,
		checkCodeText: "获取验证码",
		hasGotCode: false,
		hasLogan: true
	});
	const rules = ref({
		email: [{
				required: true,
				errorMessage: "请输入电子邮箱！",
			},
			{
				trigger: "change",
				validateFunction: function(rule, value, data, callback) {
					console.log(value);
					const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
					console.log(reg.match(value));
					if (!reg.match(value)) {
						callback("电子邮箱格式错误！");
						//return false;
					}
					callback();
					return true;
				}
			}
		],
		password: {

		}

	});

	onMounted(() => {

	});

	onBeforeMount(() => {
		checkToken();
	});

	const bindEmailPopup = ref(null);

	function popupClose(e) {
		if (e.show) return;
		state.checkCodeLen = 4;
		state.email = "";
		state.checkCode = "";
		state.checkCodeText = "获取验证码";
	}

	function login() {
		if (!state.useCheckCode)
			Login(state.account, state.password, afterLogin);
		else
			CheckCodeLogin(state.email, state.checkCode, afterLogin);
	}

	function setDataAndGoIndex(data) {
		uni.setStorageSync("user", data);
		uni.switchTab({
			url: "/pages/index",
		});
	}

	function afterLogin(res) {
		if (!res.data.succeeded) {
			uni.showToast({
				title: res.data.message,
				icon: "none"
			});
			return;
		}
		const message = res.data.message;
		const data = res.data.data;
		const toStore = {};
		toStore.uid = data.id;
		toStore.token = data.token;
		toStore.avatar = data.avatar;
		toStore.nickname = data.nickname;
		toStore.email = data.email;
		toStore.role = data.role;
		auth.token = data.token;
		formDataAuth.token = data.token;
		if (toStore.email == null) {
			loading("未绑定电子邮箱，将前往绑定电子邮箱界面", () => {
				bindEmailPopup.value.open();
				state.checkCodeLen = 5;
			}, 750);
		} else
			loading(message, () => {
				setDataAndGoIndex(toStore);
			}, 2000);
	}


	function bindEmail() {
		loading("绑定邮箱中...", () => {
			BindEmail(state.email, state.account, state.checkCode, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				bindEmailPopup.value.close();
				Login(state.account, state.password, afterLogin);
			});
		}, 2000);
	}

	function checkToken() {
		delayToRun(() => {
			const data = uni.getStorageSync("user");
			if (data == "") {
				state.hasLogan = false;
				return;
			}
			VerifyToken(data.uid, data.token, res => {
				const data = res.data;
				if (data.succeeded) {
					if (data.data) {
						uni.switchTab({
							url: "/pages/index"
						});
					} else {
						uni.showToast({
							title: "身份验证信息存在错误！请重新登录！",
							icon: "none"
						});
						uni.clearStorage();
						state.hasLogan = false;
					}
				} else {
					uni.showToast({
						title: "身份验证信息已过期！",
						icon: "none"
					});
					uni.clearStorage();
					state.hasLogan = false;
				}
			});
		}, 2000);
	}

	function getCheckCode() {
		state.hasGotCode = true;
		GetCheckCode(state.email, state.checkCodeLen);
		let i = 60;
		const timer = setInterval(() => {
			if (state.hasGotCode)
				state.checkCodeText = `${--i}秒`;
			if (i == 0) {
				state.hasGotCode = false;
				state.checkCodeText = "获取验证码"
				clearInterval(timer);
			}
		}, 1000);

	}

	function register() {
		Register(state.email, state.password, state.checkCode, res => {
			uni.showToast({
				title: res.data.message,
				icon: "none"
			});
			state.isReg = false;
			state.password = "";
			state.checkCode = "";
			state.email = "";
			state.hasGotCode = false;
			state.checkCodeText = "获取验证码";
		});
	}
</script>

<style scoped>
	#login {
		position: relative;
		/*#ifndef H5*/
		top: 20%;
		/*#endif*/
		/*#ifdef H5*/
		top: 20vh;
		/*#endif*/
		width: 90%;
		margin: 0 auto;
		height: 100%;
	}

	#login .item {
		display: flex;
		align-items: center;
	}

	#login .btns {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	#login .btn {
		width: 40%;
		margin: 0 auto;
	}

	.login-opt {
		display: flex;
		font-size: 13px;
		color: lightgray;
		justify-content: space-between;
		margin: 10px;
	}

	#login .check {
		display: flex;
		justify-content: center;
		flex-direction: row;
	}

	#login .check-code {
		width: 100px;
	}

	#login .get-check-code {
		width: 100px;
		height: 35px;
		line-height: 35px;
		margin-left: 4px;
	}

	#login .bind-email {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
	}
</style>