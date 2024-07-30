<script>
    import { getStartedSteps } from '../data.js';
  </script>
  
  <section class="get-started bg-light py-5" id="GetStarted">
    <div class="container">
      <h2 class="text-center mb-5">Get started with 4 simple steps</h2>
      <div class="row">
        {#each getStartedSteps as step}
          <div class="col-md-6 col-lg-3 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i class="bi bi-{step.icon} fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">{step.title}</h5>
                <p class="card-text">{step.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>