defmodule Saercore.SensorDatas.SensorData do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sensor_data" do
    field :timestamp, :utc_datetime
    field :value, :decimal
    field :device_id, Ecto.UUID
    field :medium, :string
    field :measurement, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(sensor_data, attrs) do
    sensor_data
    |> cast(attrs, [:device_id, :timestamp, :medium, :measurement, :value])
    |> validate_required([:device_id, :timestamp, :medium, :measurement, :value])
  end
end
