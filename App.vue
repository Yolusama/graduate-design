<script setup>
	import { onMounted,onBeforeUnmount,ref } from 'vue';
	import { Get } from './module/Request';
	const timeOpt = ref({
		timer:0,
		expire: 1000*60*3
	});
	
	onMounted(()=>{
		timeOpt.value.timer = setInterval(()=>{
		Get("/Api/Common/Heartbeat");
	},timeOpt.value.expire);
	});
	
	onBeforeUnmount(()=>{
		clearInterval(timeOpt.value.timer);
	});
	
</script>

<style>
	#app{
		position: relative;
	}
	
	.center{
		display: flex;
		align-items: center;
	}
	/*每个页面公共css */
</style>