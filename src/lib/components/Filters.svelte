<script>
  import { createEventDispatcher } from 'svelte';
  export let movies = [];
  export let defaultName = '';
  export let defaultYear = 'All';
  export let defaultGenre = 'All';
  export let defaultSort = 'title-asc'; // novo

  const dispatch = createEventDispatcher();

  $: years = Array.from(new Set(movies.map(m => m.year))).sort((a,b)=>a-b);
  $: genres = Array.from(new Set(movies.flatMap(m => m.genres))).sort();

  let name = defaultName;
  let year = defaultYear;
  let genre = defaultGenre;
  let sort = defaultSort; // novo

  function send() {
    dispatch('change', { name, year, genre, sort });
  }
</script>

<div class="flex flex-col md:flex-row flex-wrap gap-3 items-stretch md:items-end">
  <!-- filtro nome -->
  <label class="form-control w-full sm:w-60">
    <div class="label"><span class="label-text">Search by name</span></div>
    <input class="input input-bordered" placeholder="Type a title..." bind:value={name} on:input={send} />
  </label>

  <!-- filtro ano -->
  <label class="form-control w-full sm:w-40">
    <div class="label"><span class="label-text">Year</span></div>
    <select class="select select-bordered" bind:value={year} on:change={send}>
      <option>All</option>
      {#each years as y}<option value={y}>{y}</option>{/each}
    </select>
  </label>

  <!-- filtro genero -->
  <label class="form-control w-full sm:w-48">
    <div class="label"><span class="label-text">Genre</span></div>
    <select class="select select-bordered" bind:value={genre} on:change={send}>
      <option>All</option>
      {#each genres as g}<option value={g}>{g}</option>{/each}
    </select>
  </label>

  <!-- ordenação -->
  <label class="form-control w-full sm:w-56">
    <div class="label"><span class="label-text">Sort by</span></div>
    <select class="select select-bordered" bind:value={sort} on:change={send}>
      <option value="title-asc">Title (A-Z)</option>
      <option value="title-desc">Title (Z-A)</option>
      <option value="year-asc">Year (Oldest → Newest)</option>
      <option value="year-desc">Year (Newest → Oldest)</option>
    </select>
  </label>

  <button class="btn" on:click={() => {
    name=''; year='All'; genre='All'; sort='title-asc'; send();
  }}>
    Clear
  </button>
</div>
