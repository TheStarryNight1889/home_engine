defmodule Saercore.Device do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "devices" do
    field :name, :string
    field :type, Ecto.Enum, values: [:SENSOR_AIR, :SENSOR_SOIL]
    field :version, :string
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(device, attrs) do
    device
    |> cast(attrs, [:id, :version, :name, :type])
    |> validate_required([:id, :version, :type])
  end
end
