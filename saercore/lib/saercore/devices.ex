defmodule Saercore.Devices do
  alias Saercore.Repo
  alias Saercore.Devices.Device

  def list_devices do
    Repo.all(Device)
  end

  def create_device(attrs) do
    %Device{}
    |> Device.changeset(attrs)
    |> Repo.insert()
  end

  def get_device!(id) do
    Repo.get!(Device, id)
  end

  def update_device(device, attrs) do
    device
    |> Device.changeset(attrs)
    |> Repo.update()
  end

  def delete_device(device) do
    Repo.delete(device)
  end
end
