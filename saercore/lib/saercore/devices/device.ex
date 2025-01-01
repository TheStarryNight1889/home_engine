defmodule Saercore.Devices.Device do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "devices" do
    field :name, :string
    field :type, Ecto.Enum, values: [:SENSOR_AIR, :SENSOR_SOIL, :SENSOR_WATER]
    field :version, :string

    belongs_to :device_group, Saercore.DeviceGroups.DeviceGroup, type: :binary_id
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(device, attrs) do
    device
    |> cast(attrs, [:id, :version, :name, :type, :device_group_id, :inserted_at, :updated_at])
    |> validate_required([:id, :version, :type])
    |> foreign_key_constraint(:device_group_id)
  end
end
