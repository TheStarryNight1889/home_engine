defmodule Saercore.DeviceGroups do
  alias Saercore.Repo
  alias Saercore.DeviceGroups.DeviceGroup

  def list_device_groups do
    Repo.all(DeviceGroup)
  end

  def create_device_group(attrs) do
    %DeviceGroup{}
    |> DeviceGroup.changeset(attrs)
    |> Repo.insert()
  end

  def get_device_group!(id) do
    Repo.get!(DeviceGroup, id)
  end

  def update_device_group(device_group, attrs) do
    device_group
    |> DeviceGroup.changeset(attrs)
    |> Repo.update()
  end

  def delete_device_group(device_group) do
    Repo.delete(device_group)
  end
end
