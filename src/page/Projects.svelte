<div class="projects">
  <h1 class="projects__head" in:fade>Projects</h1>
  <div class="projects__tabs" in:fade>
    {#each $projects as _, index}
      <div
        class="projects__tab"
        class:active={index === current}
        on:click={() => setSlide(index)}
        in:fly={{delay: 100 + 75 * index, duration: 200, x: -10}}
      />
    {/each}
  </div>
  <div class="projects__wrapper" in:fly={{delay: 200, duration: 500, y: 20}}>
    <div class="projects__content">
      {#if !isRunning && $projects[current].link}
        <a
          href={$projects[current].link}
          target="__blank"
          class="projects__link"
          in:fade|local={{delay: 300, duration: 300}}
          out:fade|local={{duration: 300}}
        >
          see website
        </a>
      {/if}
      {#if !isRunning}
        <h2
          class="projects__title"
          in:fly|local={{duration: 300, x: 20}}
          out:fly|local={{delay: 300, duration: 300, x: 20}}
        >
          {$projects[current].name}
        </h2>
      {/if}
    </div>
    <div class="projects__layer" on:click={nextSlide} />
    <div class="projects__slider" bind:this={container} />
  </div>
</div>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  import { Slider } from '../core/class/Slider';
  import { sliderVertex, sliderFragment } from '../core/helpers/shader';
  import { webGLRenderer, projects } from '../core/store';

  // === data
  let container;
  let current = 0;
  let isRunning = false;

  const slider = new Slider({
    renderer: $webGLRenderer,
    duration: 1.5,
    easing: 'easeOut',
    uniforms: {},
    vertex: sliderVertex,
    fragment: sliderFragment,
    images: $projects.map((item) => item.image),
    displacement: 'img/disp1.jpg'
  });

  // === methods
  const nextSlide = () => {
    isRunning = true;
    slider.next((index) => {
      current = index;
      isRunning = false;
    });
  };

  const setSlide = (slide) => {
    isRunning = true;
    slider.set(slide, (index) => {
      current = index;
      isRunning = false;
    });
  };

  // === hooks
  onMount(() => {
    slider.initiate(container);
  });

  onDestroy(() => {
    slider.dispose();
  });
</script>

<style lang="scss">
  @import '../assets/style/_variable';

  .projects {
    position: relative;
    &__tabs {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      will-change: transform;
    }
    &__tab {
      width: 22px;
      height: 14px;
      margin: 0 6px;
      padding: 6px 0;
      transition: transform 0.2s ease-in-out;
      cursor: pointer;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: $text-dark-sm;
        transition: background-color 0.2s ease-in-out;
      }
      &:hover {
        &:after {
          background-color: $color-main;
        }
      }
      &.active {
        transform: scale(1.5, 1);
        &:after {
          background-color: $color-main-muted;
        }
      }
    }
    &__head {
      margin-bottom: 24px;
      color: $text-dark-lg;
      font-size: 2.4rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    &__content {
      position: absolute;
      bottom: 60%;
      right: -102px;
      z-index: 10;
      text-align: right;
    }
    &__title {
      padding: 2px 8px;
      color: $color-main;
      font-size: 1.8rem;
      font-weight: 600;
      text-transform: uppercase;
      background-color: #eceff1;
    }
    &__link {
      padding: 0 10px;
      color: $text-dark-md;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: $color-main;
      }
    }
    &__wrapper {
      position: relative;
      width: calc(100% - 102px);
      padding-top: 45%;
      &:hover {
        .projects__layer {
          outline-offset: 0;
        }
      }
    }
    &__layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      outline: 2px solid rgba($color: #eceff1, $alpha: 0.5);
      outline-offset: -18px;
      transition: all 0.2s ease-in-out;
      z-index: 5;
      cursor: pointer;
    }
    &__slider {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
