import { writable } from "svelte/store";

type ToastItem = {
	id: number;
	message: string;
	type: "info" | "success" | "warning" | "error";
	duration: number;
};

let toastCounter = 0;

function createToastStore() {
	const { subscribe, update, set } = writable<ToastItem[]>([]);

	function addToast(
		message: string,
		options: { type?: "info" | "success" | "warning" | "error"; duration?: number } = {},
	) {
		const id = ++toastCounter;
		const toast: ToastItem = {
			id,
			message,
			type: options.type || "info",
			duration: Number.isFinite(options.duration) ? options.duration : 3000,
		};

		update((items) => [...items, toast]);

		if (toast.duration > 0) {
			setTimeout(() => {
				removeToast(id);
			}, toast.duration);
		}

		return id;
	}

	function removeToast(id: number) {
		update((items) => items.filter((toast) => toast.id !== id));
	}

	function clear() {
		set([]);
	}

	return { subscribe, addToast, removeToast, clear };
}

export const toastStore = createToastStore();
