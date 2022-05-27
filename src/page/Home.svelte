<div class="main">
  <header class="main__header">
    <h1
      class="main__text"
      in:fly={{delay: 200, y: 30, duration: 500}}
    >
      <span>Frontend</span>web development
    </h1>
  </header>
  <button
    class="main__btn"
    type="button"
    on:click={nextPageRout}
    on:mouseenter={() => btnDw.set({ ...configBtnDw.hover})}
    on:mouseleave={() => btnDw.set({ ...configBtnDw.default})}
    on:mousedown={() => btnDw.set({ ...configBtnDw.click})}
    on:mouseup={() => btnDw.set({ ...configBtnDw.hover})}
    in:fly={{delay: 700, y: 40, duration: 500}}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485">
      <path
        style="fill: rgb({$btnDw.fill.r},{$btnDw.fill.g},{$btnDw.fill.b}); transform: translateY({$btnDw.translate}%);"
        d="M 121 242 L 0 121 l 186 {$btnDw.dotB} L 242 {$btnDw.dotA} L 298 {$btnDw.dotC} L 485 121 L 363 242 L 242 363 L 121 242 z"
      />
    </svg>
  </button>
</div>

<script>
  import { fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import { push } from 'svelte-spa-router';

  import { navRout } from '../core/store';

  // === data
  const configBtnDw = {
    default: {
      dotA: 242,
      dotB: 135,
      dotC: 257,
      fill: {
        r: 55,
        g: 71,
        b: 79,
      },
      translate: -15,
    },
    hover: {
      dotA: 202,
      dotB: 35,
      dotC: 157,
      fill: {
        r: 255,
        g: 110,
        b: 64,
      },
      translate: 15,
    },
    click: {
      dotA: 202,
      dotB: 35,
      dotC: 157,
      fill: {
        r: 199,
        g: 41,
        b: 41,
      },
      translate: 15,
    },
  };

  let btnDw = tweened(
    { ...configBtnDw.default },
    {
      duration: 300,
      easing: cubicOut,
    }
  );

  // === methods
  const nextPageRout = () => {
    push($navRout[1]);
  };
</script>

<style lang="scss">

  @import '../assets/style/_variable';

  .main {
    &__header {
      position: relative;
      text-align: center;
    }

    &__text {
      position: relative;
      margin-top: 60px;
      color: $text-dark-md;
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 0.15rem;
      text-transform: uppercase;
      span {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }
    }

    &__btn {
      position: absolute;
      bottom: 20px;
      left: 50%;
      padding: 0;
      border: none;
      background-color: inherit;
      transform: translateX(-50%);
      transition: opacity 0.2s ease-in-out;

      svg {
        display: block;
        width: 54px;
      }
    }
  }
</style>
