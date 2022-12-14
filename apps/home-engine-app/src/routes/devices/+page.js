/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    const res = await fetch(`http://localhost:3000/devices`);
    const devices = await res.json();
    console.log(devices);
    return { devices };
  }