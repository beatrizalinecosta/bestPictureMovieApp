<script>
  export let movie;
  export let onClick = () => {};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer" on:click={() => onClick(movie)}>
  <figure class="aspect-[2/3] overflow-hidden">
    <img src={movie.poster} alt={`Poster ${movie.title}`} class="w-full h-full object-cover" loading="lazy" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-lg">{movie.title}</h2>
    <p class="opacity-70">{movie.year}</p>
    <div class="mt-2 flex flex-wrap gap-1">
      {#each movie.genres as g}
        <span class="badge badge-outline">{g}</span>
      {/each}
    </div>
    <div class="text-sm opacity-80">
        {#if movie.win==true}
            <!-- svelte-ignore node_invalid_placement_ssr -->
            <div class="mt-2 badge badge-warning">WINNER</div>
        {:else}
            <div class="mt-2 badge badge-info">Nominated</div>
        {/if}        
    </div>
  </div>
</div>
