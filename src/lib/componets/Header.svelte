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
        <img src="/favicon.png" alt="Jazz Car logo" height="70">
      </a>
      <div class="d-flex align-items-center order-lg-last">
        <a href="tel:+918095447174" class="btn btn-outline-primary me-3 phone-btn">
          <i class="fas fa-phone-alt me-2"></i>
          <span class="d-none d-sm-inline">+91 80954 47174</span>
          <span class="btn btn-primary">Call</span>
        </a>
        <button class="navbar-toggler" type="button" id="navbutton" on:click={toggleNav}>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
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
      </div>
    </div>
  </nav>
  <br>
</header>

<style>
div {
  align-self: center;
  padding-bottom: 0px;
}

.phone-btn {
  font-size: 0.9rem;
  padding: 0.375rem 0.75rem;
}

@media (max-width: 991.98px) {
  .navbar-brand {
    max-width: 50%;
  }
  .navbar-brand img {
    max-height: 40px;
    width: auto;
  }
}

@media (max-width: 575.98px) {
  .phone-btn {
    padding: 0.375rem 0.5rem;
  }
}
</style>