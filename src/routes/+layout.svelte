<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="min-h-screen bg-base-100">
  <Navbar />
  <main class="container mx-auto px-4 py-6">
    <slot />
  </main>
</div>
