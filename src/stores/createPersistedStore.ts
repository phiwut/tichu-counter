import { writable, type Writable } from "svelte/store";

function safeParse(raw: string) {
	try {
		return JSON.parse(raw);
	} catch (error) {
		console.error("Failed to parse persisted data:", error);
		return null;
	}
}

function safeGetItem(key: string) {
	if (typeof localStorage === "undefined") {
		return null;
	}
	try {
		return localStorage.getItem(key);
	} catch (error) {
		console.error(`Failed to read ${key} from localStorage:`, error);
		return null;
	}
}

function safeSetItem(key: string, value: unknown) {
	if (typeof localStorage === "undefined") {
		return false;
	}
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (error) {
		console.error(`Failed to persist ${key} to localStorage:`, error);
		return false;
	}
}

type PersistOptions<T> = {
	validate?: (value: T) => boolean;
	migrate?: (value: unknown) => T;
};

export function createPersistedStore<T>(
	key: string,
	initialValue: T,
	options: PersistOptions<T> = {},
): Writable<T> {
	const { validate, migrate } = options;
	let startValue = initialValue;

	const storedRaw = safeGetItem(key);
	if (storedRaw) {
		const parsed = safeParse(storedRaw);
		if (parsed !== null) {
			const migrated = migrate ? migrate(parsed) : (parsed as T);
			const isValid = validate ? validate(migrated) : true;
			if (isValid) {
				startValue = migrated;
			}
		}
	}

	const store = writable(startValue);

	store.subscribe((value) => {
		const isValid = validate ? validate(value) : true;
		if (isValid) {
			safeSetItem(key, value);
		}
	});

	return store;
}
