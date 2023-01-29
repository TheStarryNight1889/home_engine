<div class="title-block">
    <p>SENSORS</p>
</div>
<div class="state-panel">
    <div class="reading-card">
        <div class="reading-card__type">
            <p>CO2</p>
        </div>
        <div class="reading-card__info">
            <div>
                {co2} PPM
            </div>
        </div>
    </div>
    <div class="reading-card">
        <div class="reading-card__type">
            <p>TEMP.</p>
        </div>
        <div class="reading-card__info">
            <div>
                {temp} °C
            </div>
        </div>
    </div>
    <div class="reading-card">
        <div class="reading-card__type">
            <p>HUMID.</p>
        </div>
        <div class="reading-card__info">
            <div>
                {hum} %
            </div>
        </div>
    </div>
</div>

<script>
	import { onMount } from "svelte";
    let co2;
    let temp;
    let hum;


    onMount(() => {
        // connect to a ws server
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            console.log("connected");
        };
        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            console.log(data);
            co2 = data.co2;
            temp = data.temperature;
            hum = data.humidity;
        };
    });
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
.title-block {
    margin: 25px;
    color: white;
    background-color: black;
    font-size: $font-size-large;
    padding: 20px;
    p{
        margin: 0;
        padding: 0;
    }
}
    .state-panel{
        @include panel;

        .reading-card {
            @include card;
            &__info {
                display: grid;
                @include label;
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
