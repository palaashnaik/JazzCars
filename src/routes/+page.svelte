<script>
    import Hero from '../lib/componets/Hero.svelte';
    import FeaturedCars from '../lib/componets/FeaturedCars.svelte';
    import GetStarted from '../lib/componets/GetStarted.svelte';
    import Blog from '../lib/componets/Blog.svelte';
    import Header from '../lib/componets/Header.svelte';
    import Footer from '../lib/componets/Footer.svelte';
  </script>
  
  <svelte:head>
    
  </svelte:head>
  

  <Header />
  <main>
    <Hero />
    <FeaturedCars />
    <GetStarted />
    <Blog />
  </main>
  <Footer />




  <style>
    :global(body) {
      font-family: 'Open Sans', sans-serif;
      color: #15171c;
      line-height: 1.5;
    
    }
    :button{
      color: eb6859;
    }
  </style>