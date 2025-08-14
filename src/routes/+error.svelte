<script>
  export let error;
  export let status;
</script>

<section class="text-center py-24">
  <h1 class="text-6xl font-bold"> {status} </h1>
  <p class="mt-4 opacity-70">{error?.message || 'Something went wrong'}</p>
  <a href="/" class="btn btn-primary mt-6">Go Home</a>
</section>
