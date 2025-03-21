<template>
    <div id="user-info" v-if="user != null">
        <div class="info">
            <div class="item">
                <el-image :src="imgSrc(user.avatar)" :preview-src-list="[imgSrc(user.avatar)]"
                    class="avatar"></el-image>
                <span>{{ user.nickname }}</span>
            </div>
            <div class="item">
            <div>
                <el-icon>
                    <Message></Message>
                </el-icon>
                电子邮箱&nbsp;
            </div>
                <span>{{ user.email }}</span>
            </div>
            <div class="item">
            <div>
                <el-icon>
                    <User></User>
                </el-icon>
                账号&nbsp;
            </div>
                <span>{{ user.account }}</span>
            </div>
            <div class="item">
                <span>上次登录时间&nbsp;</span>
                <span>{{ new Date(user.lastLoginTime).toLocaleString() }}</span>
            </div>
            <div class="item">
                <span>注册时间&nbsp;</span>
                <span>{{ new Date(user.createTime).toLocaleString() }}</span>
            </div>
        </div>
        <div>
            <div class="count-option">
                <h4 style="margin-bottom:1%">用户完成任务总数&nbsp; <span style="color:red">{{ state.finishCount }}</span></h4>
                <el-radio-group v-model="state.mode" @change="getTaskOption">
                    <el-radio-button v-for="(item, index) in state.showModes" :key="index" :label="item.value">{{
                        item.text }}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="task-option" ref="charts">
            </div>
        </div>
    </div>
</template>

<script setup>
import { CurrentUser, onlyDate, TaskCountMode } from '@/modules/Common';
import { imgSrc } from '@/modules/Request';
import stateStroge from '@/modules/StateStorage';
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import * as echarts from "echarts";
import { GetFinishedTaskCount, GetFinishedTaskCounts } from '@/api/Task';


const user = ref(null);
const charts = ref(null);

const state = reactive({
    finishCount: 0,
    mode: 0,
    showModes: [{ value: 0, text: "日" }, { value: 1, text: "周" }, { value: 2, text: "月" }]
});

let ehartItem = null;

onMounted(() => {
    const stroed = stateStroge.get(CurrentUser);
    user.value = stroed;

    GetFinishedTaskCount(user.value.id, res => {
        state.finishCount = res.data;
    });

    console.log(user.value);

    nextTick(() => {
        ehartItem = echarts.init(charts.value);
        window.onresize = () => ehartItem.resize();
        getTaskOption();
    });
});

function getTaskOption() {
    const today = onlyDate(new Date());
    GetFinishedTaskCounts(user.value.id, state.mode, today.getTime(), res => {
        const data = res.data;
        const xData = [];
        const yData = [];
        if (state.mode == TaskCountMode.day) {
            for (let item of data) {
                const date = onlyDate(new Date(item.item1));
                if (today.getTime() == date.getTime())
                    xData.push("今天");
                else
                    xData.push(`${date.getDate()}日`);
            }
        }
        else if (state.mode == TaskCountMode.week) {
            for (let item of data) {
                const date = onlyDate(new Date(item.item1));
                if (today.getTime() >= date.getTime() && today.getTime() <= new Date(date).setDate(date.getDate() + 7))
                    xData.push("本周");
                else
                    xData.push(`${date.getDate()}日`);
            }
        }
        else if (state.mode == TaskCountMode.month) {
            for (let item of data) {
                const date = onlyDate(new Date(item.item1));
                if (today.getMonth() == date.getMonth())
                    xData.push("本月");
                else
                    xData.push(`${date.getMonth()+1}月`);
            }
        }

        for (let item of data)
            yData.push(item.item2);

        const option = {
            title: {
                text: "用户任务完成情况"
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                min: 0,
                max: 40
            },
            series: [
                {
                    name: "完成数",
                    type: "line",
                    data: yData
                }
            ]
        };
        ehartItem.setOption(option);
    });
}

onBeforeUnmount(() => {
    if (stateStroge.has(CurrentUser))
        stateStroge.remove(CurrentUser);
});

</script>

<style scoped>
#user-info {
    position: relative;
    padding-top: 1%;
}

#user-info .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 5px;
}

#user-info .item {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    height: 40px;
    padding-left: 1%;
}

#user-info .count-option {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#user-info .task-option {
    height: 360px;
    width: 60vw;
}
</style>