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
        <img src="/favicon.png" alt="Jazz Car logo" class="brand-logo">
      </a>
      <div class="d-flex align-items-center order-lg-last">
        <a href="tel:+919226455114" class="btn btn-outline-primary me-3 phone-btn">
          <i class="fas fa-phone-alt me-2"></i>
          <!-- <span class="d-none d-sm-inline">+91 80954 47174</span> -->
          <span class="bi bi-telephone d-inline"> Call Us</span>
        </a>
        <a href="https://maps.app.goo.gl/xGmJGzVKfcAtvyVs9" class="btn btn-outline-primary me-3 phone-btn">
          <i class="fas fa-map-marker-alt me-2"></i>
          <!-- <span class="d-none d-sm-inline">Locate Me</span> -->
          <span class="bi bi-geo-alt d-inline">    Locate Me</span>
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
</header>
<style>
  .navbar {
    height: 8vh; /* 8% of viewport height */
    max-height: 80px; /* Maximum height for very large screens */
    min-height: 50px; /* Minimum height for very small screens */
    padding-top: 0;
    padding-bottom: 0;
  }
  .navbar-brand {
    height: 100%;
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  }
  .brand-logo {
    height: 7vh; /* 90% of navbar height to allow for some padding */
    width: auto;
    object-fit: contain;
  }
  .phone-btn {
    font-size: 0.9rem;
    padding: 0.375rem 0.75rem;
  }
  @media (max-width: 991.98px) {
    .navbar {
      height: 7vh; /* Slightly smaller on mobile */
    }
    .navbar-collapse.show {
      background-color: #f8f9fa; /* Light background for dropdown */
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .navbar-nav {
      padding-top: 0.5rem;
    }
    .nav-item {
      padding: 0.5rem 0;
    }
  }
  @media (max-width: 575.98px) {
    .phone-btn {
      padding: 0.375rem 0.5rem;
    }
  }
</style>