import { createApp } from 'vue'
import App from './App.vue'
import router from './modules/router';
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import UserEditor from './components/UserEditor.vue';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([BarChart, GridComponent, TitleComponent, TooltipComponent, CanvasRenderer]);

const app=createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component("user-editor",UserEditor);

app.use(router);
app.use(ElementPlus);
app.mount('#app');

