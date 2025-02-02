<template>
  <div id="version">
     <div class="header"> 
      <image class="image" :src="imgSrc(app.icon)"></image>
        <span>{{ app.name }}</span>
        <span>{{ VersionCode }}</span>
     </div>
     <div class="serach">
      <el-input v-model="state.querykey"></el-input>
     </div>
     <el-table :data="pagination.data">
       <el-tabel-column pros="id" label="版本id">
       </el-tabel-column>
      <el-table-column pros="type" label="类型"></el-table-column>
      <el-table-column label="发布日期">
        <template #default="version">
          <span>{{ new Date(version.publishDate).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="version">
          <span>{{ new Date(version.createTime).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述信息">
          <template #default="version">
              <p class="description" @click="showAll(version)">{{ version.description }}</p>
          </template>
      </el-table-column>
       <el-table-column label="类型">
        <template #default="version">
         <span>{{ getVersionType(version.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="version">
          <a class="download">{{ version.number }}</a>
        </template>
      </el-table-column>
     </el-table>

     <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.size"
      :page-sizes="pagination.sizes"
      :size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="getData"
      @current-change="getData"
    />
  </div>
</template>

<script setup>
import { GetVersions, VersionCode } from "@/api/Version";
import { PageOption,getVersionType } from "@/modules/Common";
import { imgSrc } from "@/modules/Request";
import {reactive,ref,onMounted} from "vue";

const state = reactive({
    querykey:"",
    year:"",
    type:"",
    version:null
});

const pagination = ref(new PageOption(1,6,0,[6,12,24]));

const app = ref({
  name:"KList",
  icon:"app.png"
});

onMounted(async ()=>{
   await getData();
});

async function getData() {
   await GetVersions(pagination.value,state.querykey,state.year,state.type,res=>{
       const data = res.data;
       pagination.value.data = data.data;
       pagination.value.total = data.total;
   });
}

</script>

<style>

</style>