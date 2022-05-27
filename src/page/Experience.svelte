<div class="experience">
  <h1 class="experience__head-main" in:fade>Experience</h1>
  <div class="experience__wrap">
    <div class="experience__control" in:fly={{delay: 200, duration: 300, y: 20}}>
      <button
        class="experience__prev"
        type="button"
        disabled={prevBtnDisabled}
        on:click={currentPrev}
        on:mouseenter={() => btnPrev.set({ ...configBtnPrev.hover})}
        on:mouseleave={() => btnPrev.set({ ...configBtnPrev.default})}
        on:mousedown={() => btnPrev.set({ ...configBtnPrev.click})}
        on:mouseup={() => btnPrev.set({ ...configBtnPrev.hover})}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 242 485">
          <path
            style="fill: rgb({$btnPrev.fill.r},{$btnPrev.fill.g},{$btnPrev.fill.b});"
            d="M 0 242 L 121 121 L 242 0 L {$btnPrev.dotB} 186 L {$btnPrev.dotA} 242 L {$btnPrev.dotC} 298 L 242 485 L 121 363 Z"
          />
        </svg>
      </button>
      {#key current}
        <div class="experience__head" in:fade|local>
          <div class="experience__name">{$experience[current].company}</div>
          <div class="experience__date">{$experience[current].date}</div>
        </div>
      {/key}
      <button
        class="experience__next"
        type="button"
        disabled={nextBtnDisabled}
        on:click={currentNext}
        on:mouseenter={() => btnNext.set({ ...configBtnNext.hover})}
        on:mouseleave={() => btnNext.set({ ...configBtnNext.default})}
        on:mousedown={() => btnNext.set({ ...configBtnNext.click})}
        on:mouseup={() => btnNext.set({ ...configBtnNext.hover})}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 242 485">
          <path
            style="fill: rgb({$btnNext.fill.r},{$btnNext.fill.g},{$btnNext.fill.b});"
            d="M 121 363 L 0 485 L {$btnNext.dotB} 298 L {$btnNext.dotA} 242 L {$btnNext.dotC} 186 L 0 0 L 121 121 L 242 242 Z"
          />
        </svg>
      </button>
    </div>
    <div class="experience__body" in:fly={{delay: 400, duration: 300, y: 30}}>
      <div class="experience__timeline">
        <Timeline
          on:message={currentSet}
          length={$experience.length}
          active={current}
        />
      </div>
      {#key current}
        <div class="experience__card" in:fade|local>
          <CardExperience
            position={$experience[current].position}
            list={$experience[current].responsibility}
          />
        </div>
      {/key}
    </div>
  </div>
</div>

<script>
  import { fade, fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import { experience } from '../core/store';

  import Timeline from '@component/modules/Timeline.svelte';
  import CardExperience from '@component/modules/CardExperience.svelte';

  // === data
  let current = $experience.length - 1;

  const configBtnPrev = {
    default: {
      dotA: 121,
      dotB: 106,
      dotC: 106,
      fill: {
        r: 55,
        g: 71,
        b: 79,
      }
    },
    hover: {
      dotA: 161,
      dotB: 206,
      dotC: 206,
      fill: {
        r: 255,
        g: 110,
        b: 64,
      }
    },
    click: {
      dotA: 161,
      dotB: 206,
      dotC: 206,
      fill: {
        r: 199,
        g: 41,
        b: 41,
      }
    },
  };

  const configBtnNext = {
    default: {
      dotA: 121,
      dotB: 136,
      dotC: 136,
      fill: {
        r: 55,
        g: 71,
        b: 79,
      }
    },
    hover: {
      dotA: 81,
      dotB: 36,
      dotC: 36,
      fill: {
        r: 255,
        g: 110,
        b: 64,
      }
    },
    click: {
      dotA: 81,
      dotB: 36,
      dotC: 36,
      fill: {
        r: 199,
        g: 41,
        b: 41,
      }
    },
  };

  let btnPrev = tweened(
    { ...configBtnPrev.default },
    {
      duration: 300,
      easing: cubicOut,
    }
  );

  let btnNext = tweened(
    { ...configBtnNext.default },
    {
      duration: 300,
      easing: cubicOut,
    }
  );

  // === computed
  $: prevBtnDisabled = current === 0;
  $: nextBtnDisabled = current === $experience.length - 1;

  // === methods
  const currentPrev = () => {
    if(current > 0) current -= 1;
    if(current === 0) btnPrev.set({ ...configBtnPrev.default});
  };
  const currentNext = () => {
    if(current < $experience.length - 1) current += 1;
    if(current === $experience.length - 1) btnNext.set({ ...configBtnNext.default});
  };
  const currentSet = (event) => {
    current = event.detail.current;
  }
</script>

<style lang="scss">
  @import '../assets/style/_variable';

  .experience {
    &__head-main {
      margin-bottom: 60px;
      color: $text-dark-lg;
      font-size: 2.4rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    &__wrap {
      margin: 0 30px;
      outline: 2px dashed rgba($color: $text-light-md, $alpha: 0.8);
      outline-offset: 30px;
    }
    &__control {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
    &__prev,
    &__next {
      width: 24px;
      height: auto;
      border: none;
      padding: 0;
      background-color: inherit;
      &:disabled {
        opacity: 0.5;
      }
    }
    &__head {
      min-width: 260px;
      margin: 0 20px;
      text-align: center;
    }
    &__name {
      margin-bottom: 2px;
      color: $text-dark-lg;
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    &__date {
      color: $text-dark-sm;
    }
    &__body {
      display: flex;
      justify-content: center;
      padding: 0 30px;
    }
    &__timeline {
      flex-shrink: 0;
      margin-right: 60px;
    }
    &__card {
      width: 100%;
    }
  }
</style>
