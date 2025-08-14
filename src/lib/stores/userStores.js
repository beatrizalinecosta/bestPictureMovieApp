import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function persistentWritable(key, initial) {
  // inicia com valor padrão
  const store = writable(initial);

  // carrega do localStorage no client
  if (browser) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try { store.set(JSON.parse(raw)); } catch (e) {}
    }
    store.subscribe((val) => {
      localStorage.setItem(key, JSON.stringify(val));
    });
  }
  return store;
}

export const watchlist = persistentWritable('watchlist', []); // array de ids
export const watched = persistentWritable('watched', []);     // array de ids
