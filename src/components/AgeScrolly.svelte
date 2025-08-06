<script>
    import Map from './Map.svelte';
    import Scrolly from './Scrolly.svelte';
  
    let scrollIndex = $state(0)

    const {
      isMobile,
    } = $props();
  
  </script>
    
  <div class="relative mb-10" style="height: 500vh;">

    <div class="sticky top-0 w-full h-screen z-0">
      <Map {scrollIndex} {isMobile} />
    </div>
    
    <Scrolly bind:value={scrollIndex}>
      <section class="h-screen flex flex-col justify-center items-center step">
        <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</p>
          <svg class="mt-2" width="300" height="30">
            <g>
              <rect x="0" y="10" width="20" height="20" fill="#B6E32B" />
              <text x="30" y="25" class="font-utility-label-reg-01">Lorem ipsum dolor</text>
            </g>
          </svg>
        </div>
      </section>
  
      <section class="h-screen flex flex-col justify-center items-center step">
        <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ac sem nec urna cursus faucibus. Etiam euismod, justo at facilisis cursus, enim erat dictum urna, nec dictum erat urna non erat.</p>
          <svg class="mt-2" width="300" height="30">
            <g>
              <rect x="0" y="10" width="20" height="20" fill="#BAA8D7" />
              <text x="30" y="25" class="font-utility-label-reg-01">Lorem ipsum dolor</text>
            </g>
          </svg>
          <svg width="300" height="30">
            <g>
              <rect x="0" y="10" width="20" height="20" fill="#D6FB65" fill-opacity=0.3 stroke="#8FB323" stroke-width=1/>
              <text x="30" y="25" class="font-utility-label-reg-01">Lorem ipsum dolor</text>
            </g>
          </svg>
        </div>
      </section>
  
      <section class="h-screen flex flex-col justify-center items-center step">
        <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
          <p>Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est.</p>
          <svg class="mt-2" width="300" height="30">
            <g>
              <rect x="0" y="10" width="20" height="20" fill="#B6E32B" />
              <text x="30" y="25" class="font-utility-label-reg-01">Lorem ipsum dolor</text>
            </g>
          </svg>
        </div>
      </section>
  
      <section class="h-screen flex flex-col justify-center items-center step">
        <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Nullam ac urna eu felis dapibus condimentum sit amet a augue.</p>
          <svg class="mt-2" width="300" height="30">
            <g>
              <rect x="0" y="10" width="20" height="20" fill="#A6D4C3" />
              <text x="30" y="25" class="font-utility-label-reg-01">Lorem ipsum dolor</text>
            </g>
          </svg>
        </div>
      </section>

    </Scrolly>

    
</div>