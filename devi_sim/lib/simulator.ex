defmodule DeviSim.Simulator do
  @moduledoc """
  This module simulates device data and publishes it to the MQTT client.
  """
  require Logger
  use GenServer

  alias DeviSim.{ConfigParser, MqttClient, MessageBuilder}

  @doc """
  Starts the Simulator GenServer.
  """
  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @impl true
  def init(_state) do
    Logger.info("Simulator started")
    devices = ConfigParser.parse_config!("config.yaml")

    Enum.each(
      devices,
      fn device ->
        # this actually needs to be set on connection -- not here.
        # if this functionality is actually needed we will have to figure out how to make 1 client per device
        case device.lwt do
          true ->
            MqttClient.publish(
              "device/#{device.id}/lwt",
              MessageBuilder.build_message({:lwt, device})
            )
        end

        case device.handshake do
          true ->
            MqttClient.publish(
              "device/#{device.id}/handshake",
              MessageBuilder.build_message({:handshake, device})
            )
        end

        schedule_simulation(device)
      end
    )

    {:ok, devices}
  end

  defp schedule_simulation(device) do
    Process.send_after(self(), {:simulate, device}, 1000)
  end

  @impl true
  def handle_info({:simulate, device}, state) do
    simulate_device(device)
    schedule_simulation(device)
    {:noreply, state}
  end

  @doc """
  Simulates a single device by publishing its data to the MQTT broker
  """
  @spec simulate_device(ConfigParser.t()) :: :ok
  def simulate_device(device) do
    device_message = MessageBuilder.build_message({:message, device})
    MqttClient.publish("data/sensor/air/#{device.id}", device_message)
    :ok
  end
end
