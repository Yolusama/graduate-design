<template>
	<uni-nav-bar left-text="账户" @clickLeft="uni.navigateBack({delta:1})" left-icon="arrow-left" right-icon="list"
	@clickRight="infoListedPopup.open();">
	</uni-nav-bar>
	<view id="user" v-if="state.user!=null">
		<view class="info">
			<image :src="imgSrc(state.user.avatar)" @click="picturePopup.open()"></image>
			<view>
				<text v-if="!state.modify.nickName">{{state.user.nickName}}</text>
				<uni-easyinput v-model="state.user.nickName" v-if="state.modify.nickName" @input="nickNameInput"
					@change="changeNickName"></uni-easyinput>
				<uni-icons type="compose" @click="state.modify.nickName=true;"></uni-icons>
			</view>
			<view>
				<text>电子邮箱 {{state.user.email}}</text>
				<text>更换</text>
			</view>
		</view>
		<uni-popup ref="picturePopup" background-color="#fff" border-radius="7px 7px 7px 7px">
			<k-radio-group :data="state.picture.data" v-model="state.picture.mode"
				@itemClick="changeAvatar"></k-radio-group>
		</uni-popup>
		<uni-popup ref="emailPopup" background-color="#fff" type="left" @change="emailPopupClose">
			<view class="change">
				<view class="header">
					<uni-icons type="closeempty" @click="emailPopup.close()">					
					</uni-icons>
				</view>
				<view><uni-easyinput v-model="state.newEmail" placeholder="新邮箱"></uni-easyinput></view>
				<view>
					<uni-easyinput v-model="state.checkCode" placeholder="验证码" maxlength="8"></uni-easyinput>
					<button size="mini" type="primary" :disabled="state.hasGotCode"
						@click="askForCode(8)">{{state.checkCodeText}}</button>
					<view class="btn">
						<button size="mini" style="background-color: rgb(0,255,0);" @click="changeEmail">确定</button>
						<button size="mini" style="background-color: gray;" @click="emailPopup.close();">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="pwdPopup" background-color="#fff" type="left" @change="pwdPopupClose">
			<view class="change">
				<view class="header">
					<uni-icons type="closeempty" @click="pwdPopup.close()">					
					</uni-icons>
				</view>
				<uni-easyinput v-model="state.pwd.newPassword" placeholder="新密码" type="password"></uni-easyinput>
				<uni-easyinput v-model="state.pwd.rNewPassword" placeholder="确认新密码" type="password"></uni-easyinput>
				<view>
					<uni-easyinput v-model="state.checkCode" placeholder="验证码" maxlength="8"></uni-easyinput>
					<button size="mini" type="primary" :disabled="state.hasGotCode"
						@click="askForCode(6)">{{state.checkCodeText}}</button>
					<view class="btn">
						<button size="mini" style="background-color: rgb(0,255,0);" @click="changePassword">确定</button>
						<button size="mini" style="background-color: gray;" @click="pwdPopup.close();">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="infoListedPopup" background-color="#fff" type="left" @change="pwdPopupClose">
			<view class="user-listed">
				<uni-list>
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view>
								<text>头像</text>
								<image class="avatar" :src="imgSrc(state.user.avatar)"></image>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view>
								<text>昵称</text>
							    <text>}{{state.user.nickName}}</text>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view>
								<text>设置邮箱</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
				<button @click="logout">注销账号</button>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		imgSrc
	} from '../module/Request';
	import {
		ValueText,
		delayToRun
	} from '../module/Common';
	import {
		ChangeAvatar,
		ChangeEmail,
		ChangeNickname,
		ChangePassword,
		Logout
	} from '../api/UserInfo';

	const picturePopup = ref(null);
	const emailPopup = ref(null);
	const pwdPopup = ref(null);
	const infoListedPopup = ref(null);

	const state = reactive({
		user: null,
		modify: {
			nickName: false
		},
		imageGetMode: 0,
		picture: {
			data: [new ValueText(0, "使用相机"), new ValueText(1, "使用本地图片")],
			mode: 0
		},
		newEmail: "",
		pwd: {
			newPassword: "",
			rNewPassword: ""
		},
		checkCodeText: "获取验证码",
		checkCode: "",
		hasGotCode: false
	});

	onMounted(() => {
		uni.getStorage({
			key: "user",
			success: res => {
				const data = res.data;
				state.user = {
					userId: data.uid,
				};
				for (let pro in data) {
					if (pro != "uid")
						state.user[pro] = data[pro];
				}
			}
		});
	});

	function nickNameInput(e) {
		state.user.nickName = e.trim();
	}

	function emailPopupClose(e) {
		if (e.show) return;
		state.checkCode = "";
		state.hasGotCode = false;
		state.checkCodeText = "获取验证码";
		state.newEmail = "";
	}

	function pwdPopupClose(e) {
		if (e.show) return;
		state.checkCode = "";
		state.hasGotCode = false;
		state.checkCodeText = "获取验证码";
		state.pwd.newPassword = "";
		state.pwd.rNewPassword = "";
	}

	function changeNickname() {
		if (state.user.nickName.length == 0) return;
		const user = uni.getStorageSync("user");
		ChangeNickname(state.user.nickName, state.user.userId, response => {
			if (!res.succeeded) {
				uni.showToast({
					title: res.messag,
					icon: "none"
				});
				state.user.nickName = user.nickName;
				return;
			}
			user.nickName = state.user.nickName;
			uni.setStorage({
				key: "user",
				data: user,
				success: res => {
					state.modify.nickName = false;
				}
			});
		});
	}

	function changeEmail() {
		ChangeEmail(state.user.email, state.newEmail, state.checkCode, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.messag,
					icon: "none"
				});
				return;
			}
			const user = uni.getStorageSync("user");
			user.email = state.newEmail;
			state.user.email = state.newEmail;
			uni.setStorage({
				key: "user",
				data: user
			});
		});
	}

	function changePassword() {
		if (state.pwd.newPassword != state.pwd.rnewPassword)
			uni.showToast({
				title: "两次输入的密码不一致",
				icon: "error"
			});
		else {
			ChangePassword({
				newPassword: state.pwd.newPassword,
				userId: state.user.userId,
				checkCode: state.checkCode,
				email: state.useremail
			}, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.messag,
						icon: "none"
					});
					return;
				}
				const expire = 1500;
				uni.showToast({
					title: "密码已更改，请重新登录！",
					icon: "none",
					duration: expire - 250
				});
				delayToRun(() => {
					Logout(false, state.user.userId, state.user.email, response1 => {
						const res1 = response1.data;
						if (!res1.succeeded) {
							uni.showToast({
								title: res1.messag,
								icon: "none"
							});
							return;
						}
						uni.clearStorage();
						uni.reLaunch({
							url: "/pages/login"
						});
					});
				}, expire)
			});
		}
	}

	function changeAvatar() {
		if (state.picture.mode == 0) {
			const context = uni.createCameraContext();
			context.takePhoto({
				quality: "high",
				success: res => {
					const file = res.tempImagePath;
					ChangeAvatar(state.user.avatar, file, state.user.userId, changeAvatarCallback);
				}
			})
		} else {
			uni.chooseImage({
				count: 1,
				success: res => {
					const filePath = res.tempFilePaths[0];
					ChangeAvatar(state.user.avatar, filePath, state.user.userId, changeAvatarCallback);
				}
			});
		}
	}

	function changeAvatarCallback(response) {
		const res = response.data;
		if (!res.succeeded) {
			uni.showToast({
				title: res.messag,
				icon: "none"
			});
			return;
		}
		state.user.avatar = res.data;
		const user = uni.getStorageSync("user");
		user.avatar = res.data;
		uni.setStorage({
			key: "user",
			data: user
		});
	}
</script>

<style>

</style>