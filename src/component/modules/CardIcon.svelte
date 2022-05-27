<div
  class="card-icon"
  class:active={isActive}
  in:scale={{ delay: 100 + 1000 * Math.random() }}
>
  <img src={icon} alt="icon" />
</div>

<script>
  import { scale } from 'svelte/transition';

  export let isActive;
  export let icon;
</script>

<style lang="scss">
  .card-icon {
    position: relative;
    width: 100%;
    grid-column: span 2;
    aspect-ratio: 1 / 1;
    padding: 20%;
    background-color: #cfd8dc;
    filter: grayscale(100%) contrast(120%);
    box-shadow: 10px 15px 25px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.25s ease-in-out;
    overflow: hidden;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -75%;
      display: block;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 100%
      );
      transform: skewX(-25deg);
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:hover {
      box-shadow: 7px 10px 10px 0 rgba(0, 0, 0, 0.1);
      &:before {
        animation: shine 0.5s;
      }
    }

    &.active {
      filter: grayscale(0) contrast(120%);
      box-shadow: 5px 7px 10px 0 rgba(0, 0, 0, 0.1);
    }
    &:nth-child(5) {
      grid-row-start: 2;
      grid-column: 2 / span 2;
    }
    &:nth-child(6) {
      grid-row-start: 2;
      grid-column: 4 / span 2;
    }
    &:nth-child(7) {
      grid-row-start: 2;
      grid-column: 6 / span 2;
    }
  }

  @keyframes shine {
    100% {
      left: 125%;
    }
  }
</style>
