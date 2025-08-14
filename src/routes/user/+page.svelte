<script>
  import { watchlist, watched } from '$lib/stores/userStores';
  import movies from '$lib/data/movies.json';

  $: watchlistMovies = movies.filter(m => $watchlist.includes(m.id));
  $: watchedMovies = movies.filter(m => $watched.includes(m.id));

  function removeFromWatchlist(id) {
    watchlist.update(arr => arr.filter(x => x !== id));
  }
  function removeFromWatched(id) {
    watched.update(arr => arr.filter(x => x !== id));
  }
</script>

<h1 class="text-3xl font-bold mb-6">Your Library</h1>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Watchlist -->
  <section>
    <h2 class="text-2xl font-semibold mb-3">Watchlist ({watchlistMovies.length})</h2>
    {#if watchlistMovies.length === 0}
      <div class="alert">Sua Watchlist está vazia.</div>
    {:else}
      <div class="space-y-3">
        {#each watchlistMovies as m}
          <div class="card bg-base-200 shadow">
            <div class="card-body flex-row items-center gap-4">
              <img src={m.poster} alt={m.title} class="w-16 h-24 object-cover rounded" />
              <div class="flex-1">
                <h3 class="font-semibold">{m.title} <span class="opacity-70">({m.year})</span></h3>
                <div class="text-sm opacity-70">{m.genres.join(', ')}</div>
              </div>
              <div class="flex gap-2">
                <button class="btn btn-secondary btn-sm" on:click={() => {
                  // mover para Watched
                  removeFromWatchlist(m.id);
                  watched.update(arr => arr.includes(m.id) ? arr : [...arr, m.id]);
                }}>Mark Watched</button>
                <button class="btn btn-ghost btn-sm" on:click={() => removeFromWatchlist(m.id)}>Remove</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Watched -->
  <section>
    <h2 class="text-2xl font-semibold mb-3">Watched ({watchedMovies.length})</h2>
    {#if watchedMovies.length === 0}
      <div class="alert">Nenhum filme marcado como assistido.</div>
    {:else}
      <div class="space-y-3">
        {#each watchedMovies as m}
          <div class="card bg-base-200 shadow">
            <div class="card-body flex-row items-center gap-4">
              <img src={m.poster} alt={m.title} class="w-16 h-24 object-cover rounded" />
              <div class="flex-1">
                <h3 class="font-semibold">{m.title} <span class="opacity-70">({m.year})</span></h3>
                <div class="text-sm opacity-70">{m.genres.join(', ')}</div>
              </div>
              <div class="flex gap-2">
                <button class="btn btn-ghost btn-sm" on:click={() => removeFromWatched(m.id)}>Unmark</button>
                <button class="btn btn-outline btn-sm" on:click={() => {
                  // mandar para watchlist novamente
                  watched.update(arr => arr.filter(x => x !== m.id));
                  watchlist.update(arr => arr.includes(m.id) ? arr : [...arr, m.id]);
                }}>Move to Watchlist</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>
