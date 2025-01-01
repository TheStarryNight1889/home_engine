defmodule SaercoreWeb.DeviceGroupJSON do
  alias Saercore.DeviceGroups.DeviceGroup

  @doc """
  Renders a list of device_groups.
  """
  def index(%{device_groups: device_groups}) do
    %{data: for(device_group <- device_groups, do: data(device_group))}
  end

  @doc """
  Renders a single device_group.
  """
  def show(%{device_group: device_group}) do
    %{data: data(device_group)}
  end

  defp data(%DeviceGroup{} = device_group) do
    %{
      id: device_group.id,
      name: device_group.name,
      inserted_at: device_group.inserted_at,
      updated_at: device_group.updated_at
    }
  end
end
