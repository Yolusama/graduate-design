<template>
    <div class="user-editor">
        <el-form label-position="right" label-width="auto">
            <el-form-item label="昵称">
                <el-input v-model="state.user.nickname" placeholder="昵称" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="state.user.role" placeholder="用户类型">
                    <el-option v-for="(role, index) in [2, 3]" :key="index" :label="getUserType(role)" :value="role">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传头像">
                <div class="upload">
                    <el-image :src="state.imgShow" :preview-src-list="[state.imgShow]" :preview-teleported="true"
                        class="avatar"></el-image>
                    <label for="file">
                        <el-icon class="upload-area">
                            <Plus />
                        </el-icon>
                        <input type="file" accept="image/*" @change="selectFile" style="display: none;" id="file">
                    </label>
                </div>
            </el-form-item>
            <view class="btns">
                <el-button type="success" plain @click="editUser">确定</el-button>
                <el-button type="info" plain @click="emits('close')" style="margin-left:14px">取消</el-button>
            </view>
        </el-form>
    </div>
</template>

<script setup>
import { AddUser, getUserType, UpdateUser, UploadAvatar } from '@/api/User';
import { copy, DefaultAvatar, LoadingOperate, previewOpenFile } from '@/modules/Common';
import { imgSrc } from '@/modules/Request';
import { onMounted, reactive, ref, defineEmits, defineProps } from 'vue';


const state = reactive({
    user: {
        nickname: "",
        avatar: DefaultAvatar,
        role: 2
    },
    isUpdate: pros.isUpdate,
    selectedFile: null,
    imgShow: ""
});

const pros = defineProps({
    user: Object,
    isUpdate: Boolean
});

const user = ref(pros.user);

onMounted(() => {
    if (user.value != null)
        state.user = user.value;
    state.imgShow = imgSrc(state.user.avatar);
});

const emits = defineEmits(["created", "updated", "close"]);

function selectFile(e) {
    const file = e.target.files[0];
    previewOpenFile(file, res => {
        state.imgShow = res;
        state.selectedFile = file;
    });
}

async function editUser() {
    if (!state.isUpdate) {
        AddUser(state.user, res => {
            state.user = res.data;
            if (state.selectedFile != null)
                UploadAvatar(state.user.id, state.user.avatar, state.selectedFile, res1 => {
                    state.user.avatar = res1.data;
                    const user = {};
                    copy(state.user, user);
                    LoadingOperate(true, "创建用户中...", "rgb(0,0,0,.5)", () => {
                        emits("created", { item: user });
                        emits("close");
                    }, 1500);

                });
            else {
                LoadingOperate(true, "创建用户中...", "rgb(0,0,0,.5)", () => {
                    const user = {};
                    copy(state.user, user);
                    emits("created", { item: user });
                    emits("close");
                }, 1500);
            }
        });
    }
    else {
        UpdateUser(state.user, () => {
            if (state.selectedFile != null)
                UploadAvatar(state.user.id, state.user.avatar, state.selectedFile, res => {
                    state.user.avatar = res.data;
                    const user = {};
                    copy(state.user, user);
                    LoadingOperate(true, "更新用户信息...", "rgb(0,0,0,.5)", () => {
                        emits("updated", { index: state.user.index, item: user });
                        emits("close");
                    }, 1500);

                });
            else {
                const user = {};
                copy(state.user, user);
                LoadingOperate(true, "更新用户信息...", "rgb(0,0,0,.5)", () => {
                    emits("updated", { index: state.user.index, item: user });
                    emits("close");
                }, 1500);
            }
        });
    }
}


</script>

<style scoped>
.user-editor {
    position: relative;
    width: 60vw;
    height: 40vh;
}

.user-editor .upload {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
}

.user-editor .upload-area {
    width: 120px;
    margin-left: 15px;
    height: 120px;
    border: 1px dashed rgb(0, 75, 235);
}

.user-editor .avatar {
    width: 120px;
    height: 100%;
    border-radius: 50%;
}

.user-editor .btns {
    display: flex;
    width: 50%;
    justify-content: center;
}
</style>