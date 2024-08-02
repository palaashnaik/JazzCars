<script>
  import { onMount } from "svelte";
  import { db } from "$lib/firebase";
  import { collection, getDocs } from "firebase/firestore";

  /**
     * @type {any[]}
     */
  let featuredCars = [];
  onMount(async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    featuredCars = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });

  // Declare variables for form inputs
  let pickupLocation = '';
  let dropLocation = '';
  let pickupDate = '';
  let dropDate = '';
  let flippedCardId ='';

  /**
     * @param {string} id
     */
  function toggleFlip(id) {

    // @ts-ignore
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

<section id="featured-car" class="featured-cars py-5">
  <div class="container">
    <h2 class="text-center mb-5">Featured Cars</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      {#each featuredCars as car (car.id)}
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
                        <button type="submit" id="buttons" class="btn btn-sm btn-primary">Submit</button>
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
  </div>
</section>

<style>
  .card-container {
    perspective: 1000px;
    height: 450px; /* Adjust this value as needed */
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
  .btn-sm{ 
  width: 30%;
  table-layout: fixed;
  border-collapse: collapse;
  }
/*   
  img{
    max-width: 100%;
    height: auto;
  }

.card-img-top{
    width: 352px;
    min-height: 234px;
    max-height: 234px;
    float: left;
    margin: 3px;
    padding: 3px;
} */
</style>