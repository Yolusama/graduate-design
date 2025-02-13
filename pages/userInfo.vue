<template>
	<view id="user" v-if="state.user!=null">
		<uni-nav-bar left-text="账户" @clickLeft="goBack" left-icon="arrow-left" right-icon="list"
			@clickRight="infoListedPopup.open();">
		</uni-nav-bar>
		<view class="info">
			<image :src="imgSrc(state.user.avatar)" @click="changeAvatar" class="image"></image>
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
			<uni-list style="width: 92%;margin-top:4%">
				<uni-list-item>
					<template v-slot:body>
						<view>
							<text style="font-size: 14px;">总完成任务数：<text
									style="color: rgb(0,75,235);font-weight: 600;">{{state.finishCount}}</text></text>
							<view>
								<uni-data-checkbox v-model="state.taskCheck.mode" :localdata="state.taskCheck.data"
									mode="tag" @change="getFinishTaskCounts">
								</uni-data-checkbox>
								<!--#ifdef H5-->
								<uni-grid :show-border="false">
									<uni-grid-item v-for="(count,index) in state.finishCounts" :key="index" :index="index">
										<view class="task-count">
											<text style="font-weight: 600;">{{count.item2}}</text>
											<text
												style="color:red;font-size: 14px;">{{getTaskCountDateStr(count.item1,index)}}</text>
										</view>
									</uni-grid-item>
								</uni-grid>
								<!--#endif-->
								<!--#ifndef H5-->
								<view style="display: flex;justify-content: space-between;width:75vw">
									<view v-for="(count,index) in state.finishCounts" :key="index" :index="index" >
										<view class="task-count">
											<text style="font-weight: 600;">{{count.item2}}</text>
											<text
												style="color:red;font-size: 14px;">{{getTaskCountDateStr(count.item1,index)}}</text>
										</view>
									</view>
								</view>
								<!--#endif-->
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="between" @click="habitPopup.open()" style="width: 100%;">
							<text style="font-size: 13px;">习惯完成概况</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<button type="primary" @click="pwdPopup.open()" size="mini" style="margin-top: 2%;">修改密码</button>
		</view>
		<uni-popup ref="emailPopup" background-color="#fff" type="left" @change="emailPopupClose" style="z-index: 101;">
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
				<button @click="logout(true)" class="logout" size="mini">注销账号</button>
			</view>
		</uni-popup>
		<uni-popup ref="habitPopup" background-color="#fff" type="right">
			<view class="habits">
				<view class="header">
					<uni-icons type="closeempty" :size="24" @click="habitPopup.close();"></uni-icons>
				</view>
				<uni-table empty-text="暂时没有设置习惯" :loading="state.pageLoading">
					<uni-th>
						习惯
					</uni-th>
					<uni-th>
						完成率
					</uni-th>
					<uni-th>
						最多连续
					</uni-th>
					<uni-th>
						共坚持
					</uni-th>
					<uni-th>
						是否达标
					</uni-th>
					<uni-tr v-for="(habit,index) in habitPageoption.data" :key="index">
						<uni-td align="center">
							<view class="habit">
								<image :src="imgSrc(habit.thumb)" class="thumb"></image>
								<text class="habit-name">{{habit.name}}</text>
							</view>
						</uni-td>
						<uni-td>
							<text style="font-weight: 600;color:black">{{getFinishRate(habit)}}%</text>
						</uni-td>
						<uni-td>
							<text>{{habit.mostDays}}天</text>
						</uni-td>
						<uni-td>
							<text>{{habit.persistDays}}天</text>
						</uni-td>
						<uni-td>
							<text v-if="habit.aimDays>0">{{habit.persistDays>=habit.aimDays?"是":"否"}}</text>
							<text v-if="habit.aimDays<0">否</text>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="page">
					<uni-pagination :current="habitPageoption.current" :total="habitPageoption.total" :show-icon="true"
						:page-size="habitPageoption.size" @change="getUserHabits" />
					<text style="font-size: 14px;">共计
					<text style="color: red;">{{habitPageoption.total}}</text>
					条数据</text>
					<text style="font-size: 14px;text-align: left;">每页
					 <text style="color: cyan;">{{habitPageoption.size}}</text>条</text>
				</view>
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
		ADayMillseconds,
		AWeek,
		PageOption,
		ValueText,
		delayToRun,
		loading,
		onlyDate
	} from '../module/Common';
	import {
		ChangeAvatar,
		ChangeEmail,
		ChangeNickname,
		ChangePassword,
		GetFinishedTaskCount,
		GetFinishedTaskCounts,
		GetUserHabits,
		Logout
	} from '../api/UserInfo';
	import {
		GetCheckCode
	} from '../api/User';

	const emailPopup = ref(null);
	const pwdPopup = ref(null);
	const infoListedPopup = ref(null);
	const habitPopup = ref(null);

	const today = ref(onlyDate(new Date()));
	const habitPageoption = ref(new PageOption(1, 10, 0));

	const state = reactive({
		user: null,
		modify: {
			nickname: false
		},
		newEmail: "",
		pwd: {
			newPassword: "",
			rNewPassword: ""
		},
		checkCodeText: "获取验证码",
		checkCode: "",
		hasGotCode: false,
		finishCount: 0,
		finishCounts: [],
		taskCheck: {
			data: [new ValueText(0, "日"), new ValueText(1, "周"), new ValueText(2, "月")],
			mode: 0
		},
		pageLoading:false
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
				getTaskCountOption();
				getUserHabits({
					current: 1
				});
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
				logout(false);
			}, expire)
		});
	}

	function changeAvatar() {
		uni.chooseImage({
			count: 1,
			success: res => {
				const filePath = res.tempFilePaths[0];
				ChangeAvatar(state.user.avatar, filePath, state.user.userId, changeAvatarCallback);
			}
		});
	}

	function changeAvatarCallback(response) {
		const res = JSON.parse(response.data);
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


	function logout(cancelAccount) {
		Logout(cancelAccount, state.user.userId, state.user.email, response => {
			const res1 = response.data;
			if (!res1.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			uni.clearStorage();
			uni.reLaunch({
				url: "/pages/login"
			});
		});
	}

	function goBack() {
		uni.navigateBack({
			delta: 1
		});
	}

	function getFinishRate(habit) {
		const frequency = {
			value: {
				days: habit.days,
				weekPersistDays: habit.weekPersistDays,
				period: habit.period
			}
		};
		const beginDate = habit.beginDate;
		const persistDays = habit.persistDays;
		const daysFromBeginDateToNow = (today.value.getTime() - beginDate.getTime()) / ADayMillseconds;
		var count = 0;
		if (frequency.value.days != null) {
			for (let i = 0; i <=  daysFromBeginDateToNow; i++) {
				const date = new Date(beginDate);
				date.setDate(date.getDate()+i);
				for (let pro in frequency.value.days) {
					if (frequency.value.days[pro] == date.getDay()) {
						count++;
						break;
					}
				}
			}
		}

		if (frequency.value.weekPersistDays != null) {
			const beginDateDay = beginDate.getDay();
			if (beginDateDay <= frequency.value.weekPersistDays) {
				count += frequency.value.weekPersistDays;
			}
			const leftDays = daysFromBeginDateToNow - (7 - beginDateDay);
			const mod = leftDays % 7;
			const left = Math.floor(leftDays / 7);
			count += frequency.value.weekPersistDays * left + (mod < frequency.value.weekPersistDays ? mod : frequency
				.value.weekPersistDays);
		}

		if (frequency.value.period != null) {
			count = Math.floor(daysFromBeginDateToNow / frequency.value.period);
		}

		if (count == 0)
			return 0;

		return parseFloat((persistDays / count).toFixed(2))*100;
	}

	function getTaskCountOption() {
		GetFinishedTaskCount(state.user.userId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.finishCount = res.data;
		});
		getFinishTaskCounts();
	}

	function getFinishTaskCounts() {
		GetFinishedTaskCounts(state.user.userId, state.taskCheck.mode, today.value, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.finishCounts = res.data;
		});
	}

	function getTaskCountDateStr(time, index) {
		const date = new Date(time);
		switch (state.taskCheck.mode) {
			case 0:
				if (index < AWeek - 1)
					return `${date.getDate()}日`;
				else
					return "今天";
			case 1:
				if (index < AWeek - 1)
					return `${date.getDate()}日`;
				else
					return "本周";
			case 2:
				if (index < AWeek - 1)
					return `${date.getMonth()+1}月`;
				else
					return "本月";
		}
	}

	function getUserHabits(e) {
		habitPageoption.value.current = e.current;
		state.pageLoading = true;
		delayToRun(()=>{
			GetUserHabits(habitPageoption.value, state.user.userId, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				habitPageoption.value.total = res.data.total;
				for (let habit of res.data.data)
					habit.beginDate = new Date(habit.beginDate);
				habitPageoption.value.data = res.data.data;
				state.pageLoading = false;
			});
		},350);
	}
</script>

<style scoped>
	#user {
		position: relative;
		width: 100%;
		/*#ifndef H5*/
		padding-top: 2vh;
		/*#endif*/
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

	#user .habits {
		position: relative;
		width: 100vw;
		height: 94vh;
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
	}

	#user .task-count {
		display: flex;
		height: 40px;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		font-size: 13px;
	}

	#user .habit {
		display: flex;
		align-items: center;
	}

	#user .thumb {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	#user .habit-name {
		max-width: 30vw;
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		margin-left: 2%;
	}
	
	#user .page{
		display: flex;
		margin-top: 3%;
		justify-content: space-between;
		padding-left: 1%;
		padding-right: 2%;
		align-items: center;
	}
</style>