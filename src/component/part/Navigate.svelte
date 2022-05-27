<nav class="navigate">
  <ul class="navigate__list">
    <li class="navigate__item">
      <button
        class="navigate__btn"
        type="button"
        disabled={prevBtnDisabled}
        on:click={prevPageRout}
        on:mouseenter={() => btnUp.set({ ...configBtnUp.hover})}
        on:mouseleave={() => btnUp.set({ ...configBtnUp.default})}
        on:mousedown={() => btnUp.set({ ...configBtnUp.click})}
        on:mouseup={() => btnUp.set({ ...configBtnUp.hover})}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485">
          <path
            style="fill: rgb({$btnUp.fill.r},{$btnUp.fill.g},{$btnUp.fill.b}); transform: translateY({$btnUp.translate}%);"
            d="M 242 121 l 121 121 l 121 121 L 298 {$btnUp.dotB} l -56 {$btnUp.dotA} L 186 {$btnUp.dotC} L 0 363 l 121 -121 L 242 121 z"
          />
        </svg>
      </button>
    </li>
    {#each routes as route}
      <li class="navigate__item">
        <a href={route} use:link use:active>
          <span class="navigate__sp" />
        </a>
      </li>
    {/each}
    <li class="navigate__item">
      <button
        class="navigate__btn"
        type="button"
        disabled={nextBtnDisabled}
        on:click={nextPageRout}
        on:mouseenter={() => btnDw.set({ ...configBtnDw.hover})}
        on:mouseleave={() => btnDw.set({ ...configBtnDw.default})}
        on:mousedown={() => btnDw.set({ ...configBtnDw.click})}
        on:mouseup={() => btnDw.set({ ...configBtnDw.hover})}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485">
          <path
            style="fill: rgb({$btnDw.fill.r},{$btnDw.fill.g},{$btnDw.fill.b}); transform: translateY({$btnDw.translate}%);"
            d="M 121 242 L 0 121 l 186 {$btnDw.dotB} L 242 {$btnDw.dotA} L 298 {$btnDw.dotC} L 485 121 L 363 242 L 242 363 L 121 242 z"
          />
        </svg>
      </button>
    </li>
  </ul>
</nav>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import { link, location, push } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';

  import { navRout } from '../../core/store';

  // === data
  const routes = $navRout;

  const configBtnUp = {
    default: {
      dotA: -35,
      dotB: 278,
      dotC: 278,
      fill: {
        r: 55,
        g: 71,
        b: 79,
      },
      translate: 20,
    },
    hover: {
      dotA: 235,
      dotB: 328,
      dotC: 328,
      fill: {
        r: 255,
        g: 110,
        b: 64,
      },
      translate: -20,
    },
    click: {
      dotA: 235,
      dotB: 328,
      dotC: 328,
      fill: {
        r: 199,
        g: 41,
        b: 41,
      },
      translate: -20,
    },
  };

  const configBtnDw = {
    default: {
      dotA: 242,
      dotB: 85,
      dotC: 207,
      fill: {
        r: 55,
        g: 71,
        b: 79,
      },
      translate: -20,
    },
    hover: {
      dotA: -28,
      dotB: 35,
      dotC: 157,
      fill: {
        r: 255,
        g: 110,
        b: 64,
      },
      translate: 20,
    },
    click: {
      dotA: -28,
      dotB: 35,
      dotC: 157,
      fill: {
        r: 199,
        g: 41,
        b: 41,
      },
      translate: 20,
    },
  };

  let btnUp = tweened(
    { ...configBtnUp.default },
    {
      duration: 300,
      easing: cubicOut,
    }
  );

  let btnDw = tweened(
    { ...configBtnDw.default },
    {
      duration: 300,
      easing: cubicOut,
    }
  );

  let onScroll = true;

  // === computed
  $: indexOfRoutes = routes.indexOf($location);
  $: prevBtnDisabled = $location === routes[0];
  $: nextBtnDisabled = $location === routes[routes.length - 1];

  $: if (prevBtnDisabled) {
    btnUp.set({ ...configBtnUp.default })
  }
  $: if (nextBtnDisabled) {
    btnDw.set({ ...configBtnDw.default })
  }

  // === methods
  const prevPageRout = () => {
    if (routes[indexOfRoutes - 1]) push(routes[indexOfRoutes - 1]);
  };

  const nextPageRout = () => {
    if (routes[indexOfRoutes + 1]) push(routes[indexOfRoutes + 1]);
  };

  const scrollDetect = (e) => {
    if(onScroll) {
      onScroll = false;
      (e.deltaY >= 0) ? nextPageRout() : prevPageRout();
      setTimeout(() => onScroll = true, 1000);
    }
  };

  // === hooks
  onMount(() => {
    window.addEventListener('wheel', scrollDetect);
  });

  onDestroy(() => {
    window.removeEventListener('wheel', scrollDetect);
  });
</script>

<style lang="scss">

  @import '../../assets/style/_variable';

  .navigate {
    padding: 80px 40px;
    &__item {
      display: flex;
      justify-content: center;
      margin: 8px 0;
    }

    &__sp {
      position: relative;
      display: block;
      width: 2px;
      height: 2px;
      background-color: $text-dark-md;
      transition: all 0.2s ease-in-out;
    }

    a {
      padding: 0 10px;
      &:hover {
        .navigate__sp {
          background-color: $color-main;
        }
      }
      &.active {
        .navigate__sp {
          transform: scale(1, 1.5);
          background-color: $color-main-muted;
        }
      }
    }

    &__btn {
      padding: 0;
      border: none;
      background-color: inherit;
      transition: opacity 0.2s ease-in-out;
      svg {
        display: block;
        width: 30px;
      }
      &[disabled] {
        opacity: 0.4;
      }
    }

    &:hover {
      .navigate__sp {
        height: 16px;
      }
    }
  }
</style>
