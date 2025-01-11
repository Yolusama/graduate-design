import App from './App';
import KCalendar from './components/KCalendar.vue';
import KTimeCounter from './components/KTimeCounter.vue';
import KSplit from './components/KSplit.vue';
import KRdaioGroup from './components/KRdaioGroup.vue';
import KHabitGroup from './components/KHabitGroup.vue';
import KSwiper from './components/KSwiper.vue';
import KRecordMonth from './components/KRecordMonth.vue';
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

App.mpType = 'app'
const app = new Vue({
  ...App
});

app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import KSplitVue from './components/KSplit.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.component("k-calendar",KCalendar);
  app.component("k-time-counter",KTimeCounter);
  app.component("k-split",KSplit);
  app.component("k-radio-group",KRdaioGroup);
  app.component("k-habit-group",KHabitGroup);
  app.component("k-swiper",KSwiper);
  app.component('k-record-month',KRecordMonth);
  return {
    app
  }
}
// #endif