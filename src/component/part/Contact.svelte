<aside class="contact">
  <button
    class="contact__btn"
    type="button"
    class:open={isOpen}
    on:click={() => (isOpen = !isOpen)}
  >
    <span />
    <span />
    <span />
  </button>

  <div class="contact__layout" class:open={isOpen}>
    <div class="contact__gradient" on:click={() => (isOpen = !isOpen)} />
    {#key isOpen}
      <div class="contact__content">
        <p class="contact__text" in:fade={{duration: 300, delay: 300}}>{$contact.position}</p>
        <h3 class="contact__name" in:fade={{duration: 300, delay: 300}}>{$contact.name}</h3>
        <ul class="contact__list">
          {#each $contact.list as contact, i}
            <li
              class="contact__ell"
              in:fly={{duration: 300, delay: 600 + 300 * i, x: -40}}
            >
              <span class="contact__key">{contact.key}:</span>
              <span class="contact__val">{contact.val}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/key}
  </div>
</aside>

<script>
  import { fly, fade } from 'svelte/transition';

  import { contact } from '../../core/store';

  let isOpen = false;
</script>

<style lang="scss">

  @import '../../assets/style/_variable';

  .contact {
    &__btn {
      position: relative;
      width: 26px;
      height: 18px;
      border: none;
      background-color: inherit;
      will-change: transform;
      z-index: 10;
      span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background-color: #37474f;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: all 0.2s ease-in-out;
        &:nth-child(1) {
          top: 0;
          transform-origin: left center;
        }
        &:nth-child(2) {
          top: 8px;
          transform-origin: left center;
        }
        &:nth-child(3) {
          top: 16px;
          transform-origin: left center;
        }
      }
      &.open {
        span {
          background-color: $text-light-md;
          &:nth-child(1) {
            transform: rotate(45deg);
            top: -1px;
            left: 3px;
          }
          &:nth-child(2) {
            width: 0;
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            top: 17px;
            left: 3px;
          }
        }
      }
      &:hover {
        span {
          background-color: $color-main;
        }
      }
      &:active {
        span {
          background-color: $color-main-muted;
        }
      }
    }

    &__layout {
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
      &.open {
        opacity: 1;
        visibility: visible;
      }
    }

    &__gradient {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        to right,
        rgb(38, 50, 56),
        rgb(38, 50, 56) 400px,
        rgb(120, 144, 156) 100%
      );
      opacity: 0.8;
    }

    &__content {
      position: relative;
      width: 400px;
      height: 100vh;
      padding: 200px 30px 60px;
      color: $text-light-md;
      background-color: #263238;
      z-index: 10;
    }

    &__name {
      margin-bottom: 50px;
      color: $text-light-lg;
      font-size: 2rem;
    }

    &__text {
      font-size: 1.2rem;
    }

    &__ell {
      margin-bottom: 14px;
    }

    &__key {
      color: $text-light-sm;
    }
  }
</style>
