defmodule Saercore.Repo.Migrations.CreateSensorData do
  use Ecto.Migration

  def change do
    create table(:sensor_data) do
      add :device_id, :uuid
      add :timestamp, :utc_datetime
      add :medium, :string
      add :measurement, :string
      add :value, :decimal

      timestamps(type: :utc_datetime)
    end
  end
end
