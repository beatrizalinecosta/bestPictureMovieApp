<script>
  import { watchlist, watched } from '$lib/stores/userStores';

  export let movie = null;
  export let open = false;
  export let onClose = () => {};

  // Valores reativos a partir dos stores
  $: isInWatchlist = movie ? $watchlist.includes(movie.id) : false;
  $: isInWatched = movie ? $watched.includes(movie.id) : false;

  function toggleWatchlist(id) {
    watchlist.update(arr => {
      let newArr;
      if (arr.includes(id)) {
        newArr = arr.filter(x => x !== id);
      } else {
        newArr = [...arr, id];
        // Remove de watched se estiver lá
        watched.update(w => w.filter(x => x !== id));
      }
      return newArr;
    });
  }

  function toggleWatched(id) {
    watched.update(arr => {
      let newArr;
      if (arr.includes(id)) {
        newArr = arr.filter(x => x !== id);
      } else {
        newArr = [...arr, id];
        // Remove da watchlist se estiver lá
        watchlist.update(w => w.filter(x => x !== id));
      }
      return newArr;
    });
  }
</script>

{#if open && movie}
  <dialog open class="modal">
    <div class="modal-box max-w-4xl">
      <div class="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-6">
        <img src={movie.poster} alt={`Poster ${movie.title}`} class="rounded-lg w-full object-cover" />
        <div>
          <h3 class="font-bold text-2xl">
            {movie.title} <span class="opacity-70">({movie.year})</span>
          </h3>
          <div class="mt-2 flex flex-wrap gap-2">
            {#each movie.genres as g}
              <span class="badge badge-outline">{g}</span>
            {/each}
          </div>
          <p class="mt-4">{movie.description}</p>
          <p class="mt-2 text-sm opacity-80"><b>Director:</b> {movie.director}</p>
          <p class="text-sm opacity-80"><b>Cast:</b> {movie.cast}</p>
          <p class="text-sm opacity-80"><b>Runtime:</b> {movie.runtime}</p>
          <p class="text-sm opacity-80"><b>Release Date:</b> {movie.released}</p>
          <div class="text-sm opacity-80">
            {#if movie.win==true}
                <div class="mt-2 badge badge-warning">WINNER</div>
            {:else}
                <div class="mt-2 badge badge-info">Nominated</div>
            {/if}

          </div>

          <div class="mt-6 flex gap-3">
            <button class="btn btn-primary" on:click={() => toggleWatchlist(movie.id)}>
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            <button class="btn btn-secondary" on:click={() => toggleWatched(movie.id)}>
              {isInWatched ? 'Unmark Watched' : 'Mark as Watched'}
            </button>
          </div>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn" on:click={onClose}>Close</button>
      </div>
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <form method="dialog" class="modal-backdrop" on:click={onClose}><button>close</button></form>
  </dialog>
{/if}
