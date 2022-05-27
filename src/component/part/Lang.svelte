<div class="lang">
  <div class="lang__field lang__field--l">
    <input type="radio" bind:group={lang} value={'EN'}>
    <span class="lang__name">EN</span>
  </div>
  <div class="lang__dash"></div>
  <div class="lang__field lang__field--r">
    <input type="radio" bind:group={lang} value={'RU'}>
    <span class="lang__name">RU</span>
  </div>
</div>

<script>
  let lang = 'EN';
</script>

<style lang="scss">

  @import '../../assets/style/_variable';

  .lang {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70px;
    will-change: transform;

    &__name {
      display: block;
      color: rgba($color: $text-dark-lg, $alpha: 0.5);
      font-size: 1.2rem;
      font-weight: 500;
      opacity: 0;
      transition: all .2s ease-in-out;
    }

    &__field {
      position: relative;
      transition: all .2s ease-in-out;
      &--l {
        transform: translateX(26px);
      }
      &--r {
        transform: translateX(-26px);
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      input:hover + .lang__name {
        color: $color-main;
      }
      input:checked + .lang__name {
        color: $color-main-muted;
        opacity: 1;
      }
    }

    &__dash {
      width: 0;
      height: 2px;
      margin-top: 4px;
      background-color: rgba($color: $text-dark-lg, $alpha: 0.5);
      opacity: 0;
      transition: all .2s ease-in-out;
    }

    &:hover {
      .lang__field {
        transform: translateX(0);
        .lang__name {
          opacity: 1;
        }
      }
      .lang__dash {
        width: 10px;
        opacity: 1;
      }
    }
  }
</style>
