<div class="skils">
  <div class="skils__wrap">
    <div class="skils__description">
      <h1 class="skils__head-main" in:fade>Skills</h1>
      {#if current === null}
        <ul class="skils__list">
          {#each $skills.common as skill, i}
            <li
              class="skils__ell"
              in:fly={{duration: 300, delay: 100 + 200 * i, x: -40}}
            >
              <span class="skils__name">{skill.name}</span>
              {#if skill.desc}
                <span class="skils__desc">({skill.desc})</span>
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        {#key current}
          <h1 class="skils__head-sub" in:fade>{$skills.detail[current].title}</h1>
          <div class="skils__text" in:fade>{$skills.detail[current].text}</div>
        {/key}
      {/if}
    </div>
    <div class="skils__icons" bind:this={icons}>
      {#each $skills.detail as skil, i}
        <CardIcon icon={skil.icon} isActive={current === i}/>
      {/each}
    </div>
  </div>
</div>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  import { skills } from '../core/store';

  import CardIcon from '@component/modules/CardIcon.svelte';

  // === data
  let icons;
  let current = null;

  // === methods
  const getIndex = (current, target, nodesList) => {
    let index = null;
    Array.from(nodesList).forEach((item, i) => {
      if(i !== current && item.contains(target)) {
        return index = i;
      }
    });
    return index;
  }

  const handleClick = (e) => {
    current = getIndex(current, e.target, icons.childNodes);
  };

  // === hooks
  onMount(() => {
    window.addEventListener('click', handleClick);
  });

  onDestroy(() => {
    window.removeEventListener( 'click', handleClick);;
  });
</script>

<style lang="scss">

  @import '../assets/style/_variable';

  .skils {
    &__wrap {
      display: grid;
      grid-auto-rows: 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: max-content;
      gap: 0 60px;
    }

    &__head-main {
      margin-bottom: 24px;
      color: $text-dark-lg;
      font-size: 2.4rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    &__head-sub {
      margin-bottom: 10px;
      color: $color-main-muted;
      font-size: 1.6rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__text {
      max-width: 420px;
      color: $text-dark-sm;
      font-size: 1.2rem;
    }

    &__list {
      padding-left: 0;
    }

    &__ell {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      &:before {
        content: "";
        display: block;
        width: 6px;
        height: 2px;
        margin-right: 8px;
        background-color: $text-dark-lg;
      }
    }

    &__name {
      margin-right: 4px;
      color: $color-main;
      font-size: 1.4rem;
    }

    &__desc {
      color: $text-dark-sm;
      font-size: 1.4rem;
      font-weight: 300;
    }

    &__icons {
      display: grid;
      grid-auto-rows: 1fr;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(3, 1fr);;
      gap: 20px;
      will-change: transform;
    }
  }
</style>

