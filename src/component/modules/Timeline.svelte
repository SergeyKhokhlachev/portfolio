<div class="timeline">
  <div class="timeline__bar" style="height: {100 / (length - 1) * active}%;"></div>
  {#each Array(length) as _, i}
    <div
      class="timeline__item"
      class:active={active === i}
      class:passed={active > i}
      on:click={() => setActive(i)}
    ></div>
  {/each}
</div>

<script>
  import { createEventDispatcher } from 'svelte';

  // === data
  export let active;
  export let length;

  // === methods
  const dispatch = createEventDispatcher();

  function setActive(index) {
    active = index;
		dispatch('message', {
			current: index
		});
	}
</script>

<style lang="scss">
  @import '../../assets/style/_variable';

  .timeline {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    width: 4px;
    height: 252px;
    margin: 11px 0;
    background-color: $text-light-md;
    &__bar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      background-color: $color-main;
      transition: all .2s ease-in-out;
    }
    &__item {
      position: relative;
      left: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: 1px solid $text-light-md;
      border-radius: 50%;
      background-color: #eceff1;
      transform: translateX(-50%);
      transition: all .2s ease-in-out;
      cursor: pointer;
      &::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: $text-light-md;
        transition: all .2s ease-in-out;
      }
      &:hover {
        &::before {
          background-color: $color-main;
        }
      }
      &.passed {
        border-color: $color-main;
        background-color: $color-main;
        &::before {
          background-color: #eceff1;
          transform: scale(1.4,1.4);
        }
        &:hover {
          background-color: #eceff1;
          &::before {
            background-color: $color-main;
          }
        }
      }
      &.active {
        border-color: $color-main;
        cursor: default;
        &::before {
          background-color: $color-main;
          transform: scale(1.5,1.5);
        }
      }
      &:nth-child(2) {
        transform: translateX(-50%) translateY(50%);
      }
      &:last-child {
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
</style>
