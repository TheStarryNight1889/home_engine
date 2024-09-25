defmodule Saercore.Mqtt.Handler do
  @moduledoc false

  require Logger
  use GenServer
  alias Saercore.Repo
  alias Saercore.SensorData

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)

  def handle_message(message), do: GenServer.cast(__MODULE__, {:handle, message})

  def handle_cast({:handle, %{topic: topic, payload: payload}}, state) do
    Logger.info("PID #{inspect(self())}")

    case String.split(topic, "/") do
      ["saercore", sensor, device_id, medium, measurement] ->
        process_message(sensor, device_id, payload, %{medium: medium, measurement: measurement})

      _ ->
        Logger.info("No handler for topic, skipping: #{topic}")
    end

    {:noreply, state}
  end

  defp process_message("sensor", device_id, payload, metadata) do
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
end
