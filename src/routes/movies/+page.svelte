<script>
  import movies from '$lib/data/movies.json';
  import MovieCard from '$lib/components/MovieCard.svelte';
  import MovieModal from '$lib/components/MovieModal.svelte';
  import Filters from '$lib/components/Filters.svelte';

  let filtered = movies;
  let selected = null;
  let open = false;

  function applyFilters({ detail }) {
    const { name, year, genre } = detail;
    filtered = movies.filter(m => {
      const byName = name ? m.title.toLowerCase().includes(name.toLowerCase()) : true;
      const byYear = year && year !== 'All' ? m.year === Number(year) : true;
      const byGenre = genre && genre !== 'All' ? m.genres.includes(genre) : true;
      return byName && byYear && byGenre;
    });
  }

  function openModal(m) {
    selected = m;
    open = true;
  }
</script>

<div class="mb-6">
  <h1 class="text-3xl font-bold mb-2">Movies</h1>
  <Filters {movies} on:change={applyFilters} />
</div>

{#if filtered.length === 0}
  <div class="alert alert-info">Nenhum filme encontrado com os filtros atuais.</div>
{:else}
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {#each filtered as m}
      <MovieCard movie={m} onClick={openModal} />
    {/each}
  </div>
{/if}

<MovieModal movie={selected} {open} onClose={() => open=false} />
