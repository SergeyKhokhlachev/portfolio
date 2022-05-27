<div class="card-user" in:fly={{delay: 300, duration: 300, y: 50}}>
  <div class="card-user__vue">
    <div class="card-user__avatar">
      <picture>
        <source srcset="img/avatar.jpg" type="image/webp">
        <img src="img/avatar.jpg" alt="avatar">
      </picture>
    </div>
    <div class="card-user__info">
      <div class="card-user__name">{$contact.name}</div>
      <div class="card-user__position">{$contact.position}</div>
      <ul class="card-user__list">
        {#each $contact.list as contact}
          <li class="card-user__item">
            <span class="card-user__key">{contact.key}:</span>
            <span class="card-user__val">{contact.val}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="card-user__content">
    <p class="card-user__text">If you have any interesting projects or suggestions, please contact me!</p>
  </div>
</div>

<script>
  import { fly } from 'svelte/transition';
  import { contact } from '../../core/store';
</script>

<style lang="scss">
  @import '../../assets/style/_variable';

  .card-user {
    display: flex;
    align-items: center;
    &__vue {
      display: flex;
      flex-shrink: 0;
    }
    &__avatar {
      position: relative;
      width: 140px;
      height: 140px;
      overflow: hidden;
      outline: 1px solid rgba($color: #eceff1, $alpha: 0.8);
      outline-offset: -14px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 14px solid rgba($color: #eceff1, $alpha: 0.5);
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    &__info {
      padding-left: 20px;
    }
    &__name {
      color: $text-dark-lg;
      font-size: 1.6rem;
    }
    &__position {
      margin-bottom: 20px;
      color: $text-dark-sm;
    }
    &__item {
      margin-bottom: 3px;
    }
    &__key {
      color: $text-dark-sm;
    }
    &__val {
      color: $text-dark-lg;
    }
    &__content {
      width: 100%;
      padding: 20px;
    }
    &__text {
      max-width: 500px;
      margin: 0 auto 30px;
      padding: 8px;
      color: $text-dark-lg;
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
      background-color: rgba($color: $text-light-md, $alpha: 0.5);
      outline: 2px dashed rgba($color: $text-light-md, $alpha: 0.8);
      outline-offset: 12px;
    }
  }
</style>
