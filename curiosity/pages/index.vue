<template>
    <div class="grid grid-cols-3 gap-2 m-2">
        <div class="card border rounded bg-base-100 shadow-xl">
            <figure></figure>
            <div class="card-body">
                <h2 class="card-title">
                    1578 PPM
                    <div class="badge badge-secondary">High</div>
                </h2>
                <p>Try opening a window to reduce your co2 levels</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">co2</div>
                    <div class="badge badge-outline">Bedroom</div>
                </div>
            </div>
        </div>
        <div class="card border rounded bg-base-100 shadow-xl">
            <figure></figure>
            <div class="card-body">
                <h2 class="card-title">
                    28°C
                    <div class="badge badge-secondary">High</div>
                </h2>
                <p>Reduce your heating to move to a more comftorable temperature</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">Temperature</div>
                    <div class="badge badge-outline">Bedroom</div>
                </div>
            </div>
        </div>
        <div class="card border rounded first-letter:bg-base-100 shadow-xl">
            <figure></figure>
            <div class="card-body">
                <h2 class="card-title">
                    26%
                    <div class="badge badge-primary">Low</div>
                </h2>
                <p>Increase your humidity to increase comftorability</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">Humidity</div>
                    <div class="badge badge-outline">Bedroom</div>
                </div>
            </div>
        </div>
    </div>
</template>