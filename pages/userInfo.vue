<template>
	<uni-nav-bar left-text="账户" @clickLeft="goBack" left-icon="arrow-left" right-icon="list"
		@clickRight="infoListedPopup.open();">
	</uni-nav-bar>
	<view id="user" v-if="state.user!=null">
		<view class="info">
			<image :src="imgSrc(state.user.avatar)" @click="picturePopup.open()" class="image"></image>
			<view class="nickname-edit">
				<text v-if="!state.modify.nickname" class="nickname">{{state.user.nickname}}</text>
				<uni-easyinput v-model="state.user.nickname" v-if="state.modify.nickname" @input="nicknameInput"
					maxlength="25" @change="changeNickname" style="width: 60%;margin-right: 2%"></uni-easyinput>
				<uni-icons type="compose" @click="state.modify.nickname=true;" v-if="!state.modify.nickname"
					color="rgb(0,125,235)" :size="20"></uni-icons>
				<uni-icons type="closeempty" @click="state.modify.nickname=false;" v-if="state.modify.nickname"
					color="red" :size="20"></uni-icons>
			</view>
			<view class="email">
				<text><uni-icons type="email" :size="18"></uni-icons> {{state.user.email}}</text>
				<text style="color:rgb(0,75,235);margin-left: 4%;" @click="emailPopup.open()">更换</text>
			</view>
			<button type="primary" @click="pwdPopup.open()" size="mini" style="margin-top: 2%;">修改密码</button>
		</view>
		<!--#ifndef H5-->
		<uni-popup ref="picturePopup" background-color="#fff" border-radius="7px 7px 7px 7px">
			<k-radio-group :data="state.picture.data" v-model="state.picture.mode"
				@itemClick="changeAvatar"></k-radio-group>
		</uni-popup>
		<!--#endif-->
		<uni-popup ref="emailPopup" background-color="#fff" type="left" @change="emailPopupClose"
			style="z-index: 101;">
			<view class="change">
				<view class="header">
					<uni-icons type="closeempty" @click="emailPopup.close()" :size="20">
					</uni-icons>
				</view>
				<view class="change-content">
					<view class="item"><uni-easyinput v-model="state.newEmail" placeholder="新邮箱"
							maxlength="25"></uni-easyinput></view>
					<view class="item">
						<uni-easyinput v-model="state.checkCode" placeholder="验证码" maxlength="8"></uni-easyinput>
						<button size="mini" :disabled="state.hasGotCode" @click="askForCode(8)"
							style="margin-left: 2%;">{{state.checkCodeText}}</button>
					</view>
					<view class="btn">
						<button size="mini" style="background-color: rgb(0,255,0);color: white;"
							@click="changeEmail">确定</button>
						<button size="mini" style="background-color: gray;color: #fff;"
							@click="emailPopup.close();">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="pwdPopup" background-color="#fff" type="left" @change="pwdPopupClose" style="z-index: 101;">
			<view class="change">
				<view class="header">
					<uni-icons type="closeempty" @click="pwdPopup.close()">
					</uni-icons>
				</view>
				<view class="change-content">
					<view class="item">
						<uni-easyinput v-model="state.pwd.newPassword" placeholder="新密码" type="password" minlength="6"
							maxlength="20"></uni-easyinput>
					</view>
					<view class="item">
						<uni-easyinput v-model="state.pwd.rNewPassword" placeholder="确认新密码" type="password"
							minlength="6" maxlength="20"></uni-easyinput>
					</view>
					<view class="item">
						<uni-easyinput v-model="state.checkCode" placeholder="验证码" maxlength="8"></uni-easyinput>
						<button size="mini" :disabled="state.hasGotCode" style="margin-left: 2%;"
							@click="askForCode(6)">{{state.checkCodeText}}</button>
					</view>
					<view class="btn">
						<button size="mini" style="background-color: rgb(0,255,0);color:white;"
							@click="changePassword">确定</button>
						<button size="mini" style="background-color: gray;color:white;"
							@click="pwdPopup.close();">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="infoListedPopup" background-color="#fff" type="right" style="z-index:100">
			<view class="user-listed">
				<view class="header">
					<uni-icons type="closeempty" :size="24" @click="infoListedPopup.close();"></uni-icons>
				</view>
				<uni-list style="width: 100%;">
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view class="between" @click="changeAvatar">
								<text>头像</text>
								<image class="avatar" :src="imgSrc(state.user.avatar)"></image>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view class="between" @click="toChangeNickname">
								<text>昵称</text>
								<text
									style="color: gray;max-width: 40vw;overflow: hidden;text-wrap: nowrap;text-overflow:ellipsis;">
									{{state.user.nickname}}</text>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view class="between" @click="emailPopup.open()">
								<text>电子邮箱</text>
								<text style="color: gray;">
									{{state.user.email}}</text>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item show-arrow>
						<template v-slot:body>
							<view class="between" @click="pwdPopup.open()">
								<text>修改密码</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
				<button @click="logout" class="logout" size="mini">注销账号</button>
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
		delayToRun,
		loading
	} from '../module/Common';
	import {
		ChangeAvatar,
		ChangeEmail,
		ChangeNickname,
		ChangePassword,
		Logout
	} from '../api/UserInfo';
	import {
		GetCheckCode
	} from '../api/User';

	const picturePopup = ref(null);
	const emailPopup = ref(null);
	const pwdPopup = ref(null);
	const infoListedPopup = ref(null);

	const state = reactive({
		user: null,
		modify: {
			nickname: false
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

	function nicknameInput(e) {
		state.user.nickname = e.trim();
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
		if (state.user.nickname.length == 0) return;
		const user = uni.getStorageSync("user");
		if (state.user.nickname == user.nickname) {
			state.modify.nickname = false;
			return;
		}
		ChangeNickname(state.user.nickname, state.user.userId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				state.user.nickname = user.nickname;
				return;
			}
			user.nickname = state.user.nickname;
			uni.setStorage({
				key: "user",
				data: user,
				success: res => {
					state.modify.nickname = false;
				}
			});
		});
	}

	function changeEmail() {
		ChangeEmail(state.user.email, state.newEmail, state.checkCode, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			const user = uni.getStorageSync("user");
			user.email = state.newEmail;
			state.user.email = state.newEmail;
			uni.setStorage({
				key: "user",
				data: user,
				success: res => {
					loading("修改中...", () => emailPopup.value.close(), 750);
				}
			});
		});
	}

	function changePassword() {
		if (state.checkCode.length < 6) {
			uni.showToast({
				title: "请输入完整验证码！",
				icon: "error"
			});
			return;
		}
		if (state.pwd.newPassword.length < 6) {
			uni.showToast({
				title: "密码长度过短（<6）",
				icon: "error"
			});
			return;
		}
		if (state.pwd.newPassword != state.pwd.rNewPassword) {
			uni.showToast({
				title: "两次输入的密码不一致",
				icon: "error"
			});
			return;
		}
		ChangePassword({
			newPassword: state.pwd.newPassword,
			userId: state.user.userId,
			checkCode: state.checkCode,
			email: state.user.email
		}, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
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
							title: res1.message,
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

	function changeAvatar() {
		//#ifndef H5
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
		//#endif
	}

	function changeAvatarCallback(response) {
		const res = response.data;
		if (!res.succeeded) {
			uni.showToast({
				title: res.message,
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

	function askForCode(length) {
		var email;
		switch (length) {
			case 6:
				email = state.user.email;
				break;
			case 8:
				email = state.newEmail;
				break;
		}
		GetCheckCode(email, length, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			let i = 60;
			state.hasGotCode = true;
			const timer = setInterval(() => {
				if (i == 0 || !state.hasGotCode) {
					clearInterval(timer);
					if (!state.hasGotCode)
						i = 0;
					state.checkCodeText = "获取验证码";
					state.hasGotCode = false;
					return;
				}
				state.checkCodeText = `${i--}s`;
			}, 1000);
		});
	}

	function toChangeNickname() {
		uni.showModal({
				title: "修改昵称",
				cancelColor: "red",
				confirmText: "确定",
				cancelText: "取消",
				editable: true,
				success: res => {
					if (res.cancel) return;
					if (res.content == state.user.nickname) return;
					ChangeNickname(res.content, state.user.userId, response => {
							const res1 = response.data;
							if (!res1.succeeded) {
								uni.showToast({
									title: res1.message,
									icon: "none"
								});
								return;
							}
							const user = uni.getStorageSync("user");
							state.user.nickname = res.content;
							user.nickname = state.user.nickname;
							uni.setStorage({
								key: "user",
								data: user,
							});
						});
					}
			});
		}

		function goBack() {
			uni.navigateBack({
				delta: 1
			});
		}
</script>

<style scoped>
	#user {
		position: relative;
		width: 100%;
	}

	#user .info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column nowrap;
		margin-top: 2%;
	}

	#user .info .image {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	#user .info .email {
		font-size: 13px;
		height: 40px;
		display: flex;
		align-items: center;
		padding: 1%;
		border-radius: 7px;
		background-color: rgb(96%, 98%, 99%);
		width: 60%;
		justify-content: center;
	}


	#user .nickname-edit {
		display: flex;
		width: 90%;
		justify-content: center;
		align-items: center;
		margin-top: 2%;
		margin-bottom: 2%;
	}

	#user .nickname {
		max-width: 80%;
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		margin-left: 2%;
		font-size: 14px;
	}

	#user .change,
	#user .user-listed {
		width: 100vw;
		height: 96vh;
	}

	#user .change .header,
	#user .user-listed .header {
		/*#ifndef H5*/
		margin-top: 3vh;
		/*#endif*/
		height: 40px;
		align-items: center;
		width: 100%;
		text-align: left;
		padding-left: 3%;
	}

	#user .change-content {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		height: 60%;
	}

	#user .change .item {
		display: flex;
		justify-content: center;
		margin-bottom: 2%;
		width: 60%;
	}

	#user .change .btn {
		width: 40%;
		display: flex;
		justify-content: space-between;
	}

	.user-listed .between {
		display: flex;
		height: 42px;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 14px;
	}

	.user-listed .between .avatar {
		height: 35px;
		width: 35px;
		border-radius: 50%;
	}

	#user .user-listed {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1%;
	}

	.user-listed .logout {
		height: 50px;
		color: red;
		border: red 1px solid;
		line-height: 50px;
		margin-top: 2%;
		width: 60%;
		font-size: 18px;
		background-color: white;
		position: absolute;
		bottom: 7%;
	}
</style>