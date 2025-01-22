const route = "/pages/usage/modal";

export const ModalDataKey = "habit-reminder-caching";

export function KShowModal(options) {
	uni.setStorage({
		key: ModalDataKey,
		data: options,
		success: res => {
			uni.navigateTo({
				url: route,
				animationType:"none"
			});
		}
	});
}