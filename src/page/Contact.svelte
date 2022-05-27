<div class="contact">
  <h1 class="contact__head-main" in:fade>Contacts</h1>
  <CardUser />
  <div class="contact__hr" in:fade></div>
</div>

<script>
  import { fade } from 'svelte/transition';
  import CardUser from '@component/modules/CardUser.svelte';
</script>

<style lang="scss">
  @import '../assets/style/_variable';

  .contact {
    &__head-main {
      margin-bottom: 24px;
      color: $text-dark-lg;
      font-size: 2.4rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    &__hr {
      max-width: 460px;
      height: 1px;
      margin: 30px auto;
      background-color: $text-light-sm;
    }
  }
</style>
