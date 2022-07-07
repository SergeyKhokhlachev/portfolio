<div class="page-wrap">
  {#if controlVue}
    <div class="page-wrap__nav" transition:fly={{delay: 300, duration: 300, x: 20}}>
      <Navigate />
    </div>
    <div class="page-wrap__contact" transition:fly={{duration: 300, x: -20, y: 0}}>
      <Contact />
    </div>
    <div class="page-wrap__lang" transition:fly={{duration: 300, x: 20, y: 0}}>
    </div>
  {/if}
  <Animate />
  <main class="content-wrap">
    {#if controlVue}
      <Router {routes} />
    {/if}
  </main>
  {#if controlVue}
    <div class="page-wrap__copy" transition:fade>
      &copy; 2022 Sergey Khokhachev
    </div>
  {/if}
  {#key loaderAn}
    <div class="loader" class:loaded={loaderAnEnd}>
      <div class="loader__box">
        <svg
          class="loader__svg"
          class:active={isHome}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 380 100"
        >
          <g style="fill: none;">
            <path
              in:draw={{ duration: 400, easing: quadInOut }}
              style="stroke: #c62828; stroke-width: 3;"
              d={strokeOne}
            />
            <path
              in:draw={{ duration: 200, easing: quadInOut, delay: 500 }}
              style="stroke: #c62828; stroke-width: 3;"
              d={strokeTwo}
            />
            <path
              in:draw={{ duration: 1200, easing: quadInOut, delay: 800 }}
              style="stroke: #f4511e; stroke-width: 2;"
              d={strokeMain}
            />
            <path
              style="stroke: #f4511e; stroke-width: 2;"
              in:draw={{ duration: 900, easing: quadInOut, delay: 2000 }}
              d={strokeEnd}
            />
            <path
              style="stroke: #c62828; stroke-width: 4;"
              in:draw={{ duration: 200, easing: quadInOut, delay: 3200 }}
              on:introend={loaded}
              d={strokeLast}
            />
          </g>
        </svg>
      </div>
    </div>
  {/key}
</div>

<script>
  import { onMount } from 'svelte';
  import { quadInOut } from 'svelte/easing';
  import { draw, fade, fly } from 'svelte/transition';

  import Router from 'svelte-spa-router';
  import { location } from 'svelte-spa-router';

  import routes from '../core/routes';
  import { strokeOne, strokeTwo, strokeMain, strokeEnd, strokeLast } from '../core/helpers/shape';

  import Navigate from '@component/part/Navigate.svelte';
  import Contact from '@component/part/Contact.svelte';
  // import Lang from '@component/part/Lang.svelte';
  import Animate from '@component/part/Animate.svelte';

  // === data
  let controlVue = false;
  let loaderAn = false;
  let loaderAnEnd = false;

  // === computed
  $: isHome = loaderAnEnd && $location === '/';

  // === methods
  const loaded = () => {
    loaderAnEnd = true;
    setTimeout(() => {
      controlVue = true;
    }, 500);
  };

  // === hooks
  onMount(() => {
    loaderAn = true;
  });
</script>

<style lang="scss">

  @import '../assets/style/_variable';

  .page-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .content-wrap {
      width: 100%;
      max-width: 1080px;
      padding: 0 20px;
    }

    &__nav {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
      z-index: 100;
    }

    &__contact {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 120;
    }

    &__lang {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 100;
    }

    &__copy {
      position: absolute;
      left: 20px;
      bottom: 20px;
      color: $text-dark-sm;
      font-size: 0.8rem;
    }
  }

  .loader {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #cfd8dc, $alpha: 1);
    transition: background-color 0.3s ease-out 300ms;
    z-index: -1;

    &__box {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 1240px;
      padding: 0 20px;
    }

    &__svg {
      width: 100%;
      max-width: 720px;
      transition: all 0.3s ease-in-out;
    }

    &.loaded {
      background-color: rgba($color: #cfd8dc, $alpha: 0);
      .loader__svg {
        opacity: 0.2;
        transform: translateY(-50px) scale(0.85, 0.85);
        &.active {
          opacity: 1;
        }
      }
    }
  }
</style>
