/**
 * @file Creates Svelte stores persisted to localStorage.
 */

import { writable, type Writable } from 'svelte/store';

/**
 * Creates a writable store that hydrates from and persists to localStorage.
 */
export function persistedStore<T>(
	key: string,
	initial: T,
	parse?: (raw: unknown) => T | undefined
): Writable<T> {
	let value = initial;

	if (typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as unknown;
				value = parse ? (parse(parsed) ?? initial) : ({ ...initial, ...(parsed as object) } as T);
			} catch (error) {
				console.error(`Failed to parse ${key} from localStorage`, error);
			}
		}
	}

	const store = writable<T>(value);

	store.subscribe((next) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(next));
		}
	});

	return store;
}
