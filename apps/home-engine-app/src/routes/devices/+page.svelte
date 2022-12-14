<div class="device-panel">
    <!-- for each device-->
    {#each data.devices as device}
        <div class="device-card">
            <div class="device-card__type">
                <p>{device.type}</p>
            </div>
            <div class="device-card__info">
                {device.hw_id}
            </div>
        </div>
    {/each}
  </div>  
<script>
    /** @type {import('./$types').PageData} */  export let data;
</script>

<style lang="scss">
// Define variables for reusable values
$gap: 25px;
$card-height: 250px;
$card-bg-color: #F0C808;
$border-color: black;
$font-size-label: 1.5rem;
$font-size-large: 3.5rem;
$font-weight-bold: 600;
$color-label: #772D8B;
$color-border: black;

// Define mixins for reusable styles

@mixin panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 $gap;
    gap: $gap;
}

@mixin card {
    display: grid;
    grid-template-columns: 15% 85%;
    height: $card-height;
    background-color: $card-bg-color;
    text-align: center;
    border: 5px solid $border-color;
    border-top: 25px solid $border-color;
}

@mixin label {
    margin: 10px;
    font-size: $font-size-label;
    text-align: left;
    font-weight: $font-weight-bold;
    color: $color-label;
}

@mixin rotated-label {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    color: $border-color;
    border-right: 5px solid $border-color;
    writing-mode: sideways-lr;
}

// Use mixins and variables in the styles
.device-panel {
  @include panel;

  .device-card {
    @include card;

    &__info {
      @include label;
      & svg {
        width: 50px;
        height: 50px;
        margin: 10px;
        cursor: pointer;
      }
    }

    &__type {
      @include rotated-label;
      & p {
        margin: 0;
        width: 100%;
      }
    }
  }
}
</style>