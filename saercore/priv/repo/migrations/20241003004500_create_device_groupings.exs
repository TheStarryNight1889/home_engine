defmodule Saercore.Repo.Migrations.CreateDeviceGroupsAndUpdateDevices do
  use Ecto.Migration

  def change do
    create table(:device_groups, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false

      timestamps(type: :utc_datetime)
    end

    alter table(:devices) do
      add :device_group_id, references(:device_groups, type: :binary_id, on_delete: :nilify_all)
    end

    create index(:devices, [:device_group_id])
  end
end
