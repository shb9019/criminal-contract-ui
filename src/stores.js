import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const publicAddress = writable("0xcafebabe");
export const isCreateBountyOpen = writable(false);
