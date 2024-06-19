defmodule DeviSim.MqttClient do
  @moduledoc """
  This module provices a GenServer implementation for an MQTT client.
  """
  require Logger
  use GenServer

  @doc """
  Starts the MQTT client.
  """
  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @impl true
  def init(_state) do
    {:ok, client_pid} =
      Tortoise.Supervisor.start_child(
        client_id: "device_simulator",
        handler: {DeviSim.MqttHandler, []},
        server: {Tortoise.Transport.Tcp, host: "localhost", port: 1883},
        subscriptions: [{"device/debug", 0}]
      )

    Logger.info("MQTT client started")
    {:ok, %{client_pid: client_pid}}
  end

  @impl true
  def handle_cast({:publish, topic, payload}, state) do
    Tortoise.publish("device_simulator", topic, payload)
    {:noreply, state}
  end

  @doc """
  Publishes a message to the specified MQTT topic.
  """
  @spec publish(String.t(), any()) :: :ok
  def publish(topic, payload) do
    GenServer.cast(__MODULE__, {:publish, topic, payload})
  end
end
