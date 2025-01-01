<script>
  import "../app.css";

  import { page } from '$app/stores';

  import CarbonIotPlatform from '~icons/carbon/iot-platform';
  import AkarIconsAir from '~icons/akar-icons/air';
  import FaHome from '~icons/fa/home';

  let { children } = $props();

</script>

<div class="flex">
    <div class="flex flex-col bg-eerie w-1/6 h-screen p-4 gap-8">
        <div class="flex flex-row p-2 gap-4">
            <AkarIconsAir width="36px" height="36px"/>
            <h1 class="text-4xl">saer</h1>
        </div>
        <div class="flex flex-col">
            <div>
                <a href="/" class="flex rounded gap-4 p-2" class:bg-darkgreen={$page.url.pathname === '/'}>
                    <FaHome width="24px" height="24px"/>
                    <h1 class="text-xl">Home</h1>
                </a>
            </div>
            <div>
                <a href="/devices" class="flex rounded gap-4 p-2" class:bg-darkgreen={$page.url.pathname === '/devices'}>
                    <CarbonIotPlatform width="24px" height="24px"/>
                    <h1 class="text-xl">Devices</h1>
                </a>
            </div>
        </div>
    </div> 
    <div class="m-4">
      {@render children()}
    </div>
</div>
