<script lang="ts">
	import type { PageData } from './$types';
	
    let { data }: PageData = $props();
</script>

<div class="flex gap-4">
    <div>
        <h1 class="text-2xl pb-2">Devices</h1>
        <table class="table-auto rounded border-collapse bg-eerie">
            <thead class="border-b">
                <tr>
                    <th class="text-left p-2">ID</th>
                    <th class="text-left p-2">Name</th>
                    <th class="text-left p-2">Type</th>
                    <th class="text-left p-2">Version</th>
                    <th class="text-left p-2">Group</th>
                </tr>
            </thead>
            <tbody>
                {#each data.devices ?? [] as device}
                    <tr>
                        <td class="p-2">{device.id}</td>
                        <td class="p-2">{device.name}</td>
                        <td class="p-2">{device.type}</td>
                        <td class="p-2">{device.version}</td>
                        <td class="p-2">{device.device_group_id}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div>
        <h1 class="text-2xl pb-2">Device Groups</h1>
        <div>
            {#each data.deviceGroups ?? [] as deviceGroup}
                <div class="bg-eerie rounded p-2">
                    <h1 class="text-xl">{deviceGroup.name}</h1>
                    <p class="text-xs text-brightgreen">{deviceGroup.id}</p>
                    <p class="py-2 text-xs text-right">{deviceGroup.inserted_at}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
