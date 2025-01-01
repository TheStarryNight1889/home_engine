defmodule Saercore.Mqtt.Handler do
  @moduledoc false

  require Logger
  use GenServer
  alias Saercore.Repo
  alias Saercore.SensorDatas.SensorData
  alias Saercore.Devices.Device

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)

  def handle_message(message), do: GenServer.cast(__MODULE__, {:handle, message})

  def handle_cast({:handle, %{topic: topic, payload: payload}}, state) do
    Logger.info("PID #{inspect(self())}")

    case String.split(topic, "/") do
      ["saercore", "sensor", device_id, medium, measurement] ->
        process_message(:sensor, device_id, payload, %{medium: medium, measurement: measurement})

      ["saercore", "connection", device_id] ->
        process_message(:connection, device_id, payload)

      _ ->
        Logger.info("No handler for topic, skipping: #{topic}")
    end

    {:noreply, state}
  end

  defp process_message(:sensor, device_id, payload, metadata) do
    Logger.info("Processing CO2 message: #{inspect(payload)}")

    data = Jason.decode!(payload)

    Repo.insert(%SensorData{
      device_id: device_id,
      timestamp: DateTime.from_iso8601(data["timestamp"]) |> elem(1),
      value: data["value"],
      measurement: metadata[:measurement],
      medium: metadata[:medium]
    })

    {:ok}
  end

  defp process_message(:connection, device_id, payload) do
    Logger.info("Processing connection message: #{inspect(payload)} for device: #{device_id}")
    data = Jason.decode!(payload)

    result =
      case Repo.get(Device, device_id) do
        nil ->
          %Device{
            id: device_id,
            name: nil,
            version: data["version"],
            type: data["type"]
          }

        device ->
          device
      end
      |> Device.changeset(%{version: data["version"], type: data["type"]})
      |> Repo.insert_or_update()

    case result do
      {:ok, _} ->
        Logger.info("Device #{device_id} updated")

      {:error, changeset} ->
        Logger.error("Error updating device #{device_id}: #{inspect(changeset.errors)}")
    end
  end
end
