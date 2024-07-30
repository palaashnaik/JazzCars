<script>
    import { blogPosts } from '../data.js';
  </script>
  
  <section id="blog" class="blog py-5">
    <div class="container">
      <h2 class="text-center mb-5">Our Blog</h2>
      <div class="row flex-nowrap overflow-auto">
        {#each blogPosts as post}
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
              <img src={post.image} class="card-img-top" alt={post.title}>
              <div class="card-body">
                <span class="badge bg-primary mb-2">{post.category}</span>
                <h5 class="card-title">{post.title}</h5>
                <div class="d-flex justify-content-between text-muted">
                  <small><i class="bi bi-calendar"></i> {post.date}</small>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>    