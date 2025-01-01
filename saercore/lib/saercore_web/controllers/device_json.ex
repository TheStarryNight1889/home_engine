defmodule SaercoreWeb.DeviceJSON do
  alias Saercore.Devices.Device

  @doc """
  Renders a list of devices.
  """
  def index(%{devices: devices}) do
    %{data: for(device <- devices, do: data(device))}
  end

  defp data(%Device{} = device) do
    %{
      id: device.id,
      name: device.name,
      type: device.type,
      version: device.version,
      device_group_id: device.device_group_id,
      inserted_at: device.inserted_at,
      updated_at: device.updated_at
    }
  end
end
