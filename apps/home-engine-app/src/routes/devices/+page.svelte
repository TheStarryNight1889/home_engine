<div class="device-panel">
    <!-- for each device-->
    {#each data.devices as device}
        <div class="device-card">
            <div class="device-card__type">
                <p>{device.type}</p>
            </div>
            <div class="device-card__info">
                <div>
                    {device.hw_id}
                </div>
                <div class="device-card__info__delete">
                    <svg xmlns="http://www.w3.org/2000/svg" on:click='{openModal}' viewBox="0 0 384 512">
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                    </svg>
                </div>
            </div>
        </div>
    {/each}
</div>
<div id="modal" class="delete-modal">
    <!-- Add a heading and a message to the modal -->
    <h2>Delete Confirmation</h2>
    <p>Are you sure you want to delete?</p>
</div>  

<script>
    /** @type {import('./$types').PageData} */  export let data;

    function openModal() {
        // Get the modal element
        var modal = document.getElementById("modal");
        // Show the modal
        modal.style.display = "block";
    }
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
        display: grid;
      @include label;
      &__delete {
        justify-self: end;
        align-self: end;
        width: 32px;
        fill: red;
        margin-right: 10px;
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
.delete-modal{
    width: 300px;
    height: 200px;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    h2{
        margin: 0;
    }
    display: hidden;
}
</style>