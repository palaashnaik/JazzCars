<script>
  import { onMount } from 'svelte';

  let isActive = false;
  let isScrolled = false;

  function toggleNav() {
    isActive = !isActive;
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY >= 10;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header class="fixed-top {isScrolled ? 'bg-light shadow' : ''}">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">
    <img src="/favicon.png" alt="Jazz Car logo" height="60">
      </a>
      <button class="navbar-toggler" type="button" id ="navbutton"on:click={toggleNav}>
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse {isActive ? 'show' : ''}" id="navbarNav">
        <ul class="navbar-nav ms-auto" id='navid'>
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#featured-car">Explore cars</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#GetStarted">Get Started</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#blog">Blog</a>
          </li>
        </ul>
        <div class="d-flex align-items-center ms-lg-4">
          <a href="tel:88002345678" class="text-dark me-3 d-none d-lg-block">
            <small>+91 80954 47174</small><br>
            <small class="text-muted"> 8:00 am - 8:00 pm</small>
          </a>
          <!-- <a href="#featured-car" class="btn btn-primary">Explore cars</a> -->
        </div>
      </div>
    </div>
  </nav>
  <br>
</header>

<style>
div { align-self: center;
    padding-bottom: 0px;
}

</style> 