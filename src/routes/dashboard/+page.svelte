<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { watchlist, watched } from '$lib/stores/userStores';
  import moviesData from '$lib/data/movies.json';

  let watchedCount = 0;
  let watchlistCount = 0;
  let watchedPercent = 0;
  let genreStats = {};

  let chartCanvas;

  $: watchedMovies = moviesData.filter(m => $watched.includes(m.id));
  $: watchlistMovies = moviesData.filter(m => $watchlist.includes(m.id));

  $: watchedCount = watchedMovies.length;
  $: watchlistCount = watchlistMovies.length;

  $: watchedPercent = moviesData.length
    ? ((watchedCount / moviesData.length) * 100).toFixed(1)
    : 0;

  // Conta quantos filmes assistidos por gênero
  $: genreStats = watchedMovies.reduce((acc, movie) => {
    movie.genres.forEach(g => {
      acc[g] = (acc[g] || 0) + 1;
    });
    return acc;
  }, {});

  onMount(() => {
    if (chartCanvas) {
      new Chart(chartCanvas, {
        type: 'pie',
        data: {
          labels: Object.keys(genreStats),
          datasets: [{
            label: 'Gêneros Assistidos',
            data: Object.values(genreStats),
          }]
        }
      });
    }
  });
</script>

<div class="p-6">
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

  <div class="stats shadow w-full mb-6">
    <div class="stat">
      <div class="stat-title">Filmes Assistidos</div>
      <div class="stat-value">{watchedCount}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Na Watchlist</div>
      <div class="stat-value">{watchlistCount}</div>
    </div>
    <div class="stat">
      <div class="stat-title">% Assistidos</div>
      <div class="stat-value">{watchedPercent}%</div>
    </div>
  </div>

  <div class="card bg-base-200 p-4">
    <h2 class="text-xl font-semibold mb-4">Distribuição por Gênero (Assistidos)</h2>
    {#if Object.keys(genreStats).length > 0}
      <canvas bind:this={chartCanvas} width="400" height="400"></canvas>
    {:else}
      <p class="opacity-70">Nenhum filme assistido ainda.</p>
    {/if}
  </div>
</div>
