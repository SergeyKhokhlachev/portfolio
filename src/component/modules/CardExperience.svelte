<div class="card-experience">
    <div class="card-experience__position">{position}</div>
    <ul class="card-experience__list">
      {#each list as item}
          <li class="card-experience__item">{item}</li>
      {/each}
    </ul>
</div>

<script>
  export let position;
  export let list;
</script>

<style lang="scss">
  @import '../../assets/style/_variable';

  .card-experience {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgba($color: $text-light-md, $alpha: 0.5);
    &__position {
      margin-bottom: 16px;
      color: $color-main;
      font-size: 1.4rem;
    }
    &__list {
      padding-left: 20px;
    }
    &__item {
      position: relative;
      margin-bottom: 10px;
      color: $text-dark-lg;
      &::before {
        content: "";
        position: absolute;
        left: -20px;
        top: 10px;
        width: 10px;
        height: 2px;
        background-color: $color-main;
      }
    }
  }
</style>
