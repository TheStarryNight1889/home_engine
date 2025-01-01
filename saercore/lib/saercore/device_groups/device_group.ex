defmodule Saercore.DeviceGroups.DeviceGroup do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "device_groups" do
    field :name, :string

    has_many :devices, Saercore.Devices.Device

    timestamps(type: :utc_datetime)
  end

  def changeset(device_group, attrs) do
    device_group
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
