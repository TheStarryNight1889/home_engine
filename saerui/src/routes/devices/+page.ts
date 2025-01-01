import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const devicesRes = await fetch(`/api/devices`);
	const devicesResponseJson = await devicesRes.json();
    const devices = devicesResponseJson.data;

    const deviceGroupsRes = await fetch(`/api/device-groups`);
    const deviceGroupsResponseJson = await deviceGroupsRes.json();
    const deviceGroups = deviceGroupsResponseJson.data;

	return { devices, deviceGroups};
};
