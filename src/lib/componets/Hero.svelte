<script>
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';

  let transmissionType = 'none';
  let maxPrice = '';

  /**
     * @type {any[]}
     */
  let cars = [];
  /**
     * @type {string | any[]}
     */
  let filteredCars = [];
  /**
     * @type {null}
     */
  let flippedCardId = null;
  let pickupLocation = '';
  let dropLocation = '';
  let pickupDate = '';
  let dropDate = '';
  let hasSearched = false;

  onMount(async () => {
    await loadCars();
  });

  async function loadCars() {
    const carsCollection = collection(db, 'cars');
    const carsSnapshot = await getDocs(carsCollection);
    cars = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  function handleSearch() {
    filteredCars = cars.filter(car => {
      const matchesTransmission = transmissionType === 'none' || car.transmission.toLowerCase() === transmissionType.toLowerCase();
      const matchesPrice = !maxPrice || parseFloat(car.price) <= parseFloat(maxPrice);
      return matchesTransmission && matchesPrice;
    });
    hasSearched = true;
  }

  /**
     * @param {null} id
     */
  function toggleFlip(id) {
    flippedCardId = flippedCardId === id ? null : id;
  }

  /**
     * @param {any} name
     * @param {string} pickupLocation
     * @param {string} dropLocation
     * @param {string} pickupDate
     * @param {string} dropDate
     */
  function whatsapp(name, pickupLocation, dropLocation, pickupDate, dropDate) {
    const phoneNumber = "88002345678"; // Replace with your actual WhatsApp number
    const message = `I'm interested in renting the ${name}.\n\nPick-up Location: ${pickupLocation}\nDrop-off Location: ${dropLocation}\nPick-up Date: ${pickupDate}\nDrop-off Date: ${dropDate}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
</script>

<section id="home" class="hero bg-light py-5">
  <div class="container main-container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <h1 class="display-4 fw-bold mb-4">The easy way to takeover a lease</h1>
        <p class="lead mb-4">Lease your favorite car or bike today!</p>
        
        <div class="search-container">
          <form on:submit|preventDefault={handleSearch} class="search-form">
            <div class="search-input">
              <label for="transmissionType" class="visually-hidden">Transmission Type</label>
              <select bind:value={transmissionType} id="transmissionType" class="form-select">
                <option value="none">Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div class="search-input">
              <label for="maxPrice" class="visually-hidden">Max Price</label>
              <input type="number" bind:value={maxPrice} id="maxPrice" class="form-control" placeholder="Max Price">
            </div>
            <button type="submit" class="btn btn-primary search-btn">
              <i class="bi bi-search"></i> Search
            </button>
          </form>
        </div>
      </div>
      <div class="col-lg-6 d-none d-lg-block">
        <img src="/assets/images/thar.png" alt="Hero banner" class="img-fluid rounded">
      </div>
    </div>
  </div>
</section>

{#if hasSearched}
  <section id="search-results" class="py-5">
    <div class="container">
      <h2 class="text-center mb-5">Search Results</h2>
      {#if filteredCars.length > 0}
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {#each filteredCars as car (car.id)}
            <div class="col">
              <div class="card-container">
                <div class="card-flip" class:is-flipped={flippedCardId === car.id}>
                  <div class="card-face card-front">
                    <div class="card flex justify-content-center">
                      <div class="mx-auto"><img src={car.photoURL} class="card-img-top" alt={car.name}></div>
                      <div class="card-body d-flex flex-column">
                        <div class="flex-grow-1">
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <h4 class="card-title mb-0">{car.name}</h4>
                          </div>
                        <div class="row row-cols-2"> 
                            <div  class="g-col-6"><i class="bi bi-people"></i> {car.capacity} People</div>
                            <div  class="g-col-6"><i class="bi bi-fuel-pump"></i> {car.type}</div>
                            <div  class="g-col-6"><i class="bi bi-speedometer2"></i> {car.mileage} Kmpl</div>
                            <div  class="g-col-6"><i class="bi bi-gear"></i> {car.transmission}</div>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                          <strong class="fs-5">{car.price}<small>/Day</small></strong>
                          <button class="btn btn-sm btn-outline-primary" on:click={() => toggleFlip(car.id)}>
                            Rent now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-face card-back">
                    <div class="card">
                      <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3">Rent {car.name}</h5>
                        <form class="flex-grow-1" on:submit|preventDefault={() => whatsapp(car.name, pickupLocation, dropLocation, pickupDate, dropDate)}>
                          <div class="mb-2">
                            <label for="pickupLocation" class="form-label">Pick-up Location</label>
                            <input type="text" class="form-control form-control-sm" id="pickupLocation" bind:value={pickupLocation} required>
                          </div>
                          <div class="mb-2">
                            <label for="dropLocation" class="form-label">Drop-off Location</label>
                            <input type="text" class="form-control form-control-sm" id="dropLocation" bind:value={dropLocation} required>
                          </div>
                          <div class="mb-2">
                            <label for="pickupDate" class="form-label">Pick-up Date</label>
                            <input type="date" class="form-control form-control-sm" id="pickupDate" bind:value={pickupDate} required>
                          </div>
                          <div class="mb-2">
                            <label for="dropDate" class="form-label">Drop-off Date</label>
                            <input type="date" class="form-control form-control-sm" id="dropDate" bind:value={dropDate} required>
                          </div>
                          <br>
                          <br>
                          <br>
                          <div class="d-flex justify-content-between mt-auto">
                            <button type="button" id="buttons" class="btn btn-sm btn-primary" on:click={() => toggleFlip(car.id)}>Back</button>
                            <button type="submit" id="buttons" class="btn btn-sm btn-secondary">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-center">No cars found matching your criteria.</p>
      {/if}
    </div>
  </section>
{/if}

<style>
  .hero {
    padding-top: 6rem;
  }
  .main-container {
    padding-top: 2rem;
  }
  .search-container {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .search-input {
    flex: 1 1 100%; /* Changed to 100% width on smaller screens */
    min-width: 0; /* Remove min-width constraint */
  }
  .search-btn {
    flex: 1 1 100%; /* Full width button on smaller screens */
    min-width: 0; /* Remove min-width constraint */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  /* Add these new styles */
  @media (min-width: 576px) {
    .search-input {
      flex: 1 1 calc(50% - 5px); /* Two inputs per row on larger screens */
    }
    .search-btn {
      flex: 0 0 auto; /* Auto width on larger screens */
    }
  }

  @media (min-width: 768px) {
    .search-form {
      flex-wrap: nowrap;
    }
    .search-input {
      flex: 1 1 0%;
    }
  }


  .card-container {
    perspective: 1000px;
    height: 450px;
    margin-bottom: 2rem;
  }
  .card-flip {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .card-flip.is-flipped {
    transform: rotateY(180deg);
  }
  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .card-back {
    transform: rotateY(180deg);
  }
  .card {
    height: 100%;
  }
  .form-label {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  .btn-sm {
    width: 30%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  @media (max-width: 767px) {
    .main-container {
      padding-top: 4rem; /* Increased padding for mobile view */
    }
    .search-form {
      flex-direction: column;
    }
    .search-input, .search-btn {
      width: 100%;
    }
    .search-btn {
      margin-top: 10px;
    }
  }
</style>