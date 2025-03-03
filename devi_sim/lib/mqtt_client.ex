defmodule DeviSim.MqttClient do
  @moduledoc """
  This module provides a GenServer implementation for an MQTT client using the EMQTT library.
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
    # Define options for the EMQTT client.
    # Note: host must be a charlist.
    opts = [
      clientid: "device_simulator",
      host: "localhost",
      port: 1883,
      clean_start: false
    ]

    # Start the EMQTT client process.
    {:ok, client_pid} = :emqtt.start_link(opts)
    Logger.info("MQTT client started: #{inspect(client_pid)}")

    # Connect to the MQTT broker.
    case :emqtt.connect(client_pid) do
      {:ok, _}->
        Logger.info("Connected to MQTT broker")
      {:error, reason} ->
        Logger.error("Failed to connect: #{inspect(reason)}")
    end

    # Subscribe to the "device/debug" topic with QoS 0.
    case :emqtt.subscribe(client_pid, {"device/debug", 0}) do
      {:ok, _sub_id, granted} ->
        Logger.info("Subscribed to device/debug, granted: #{inspect(granted)}")
      {:error, reason} ->
        Logger.error("Failed to subscribe: #{inspect(reason)}")
    end

    {:ok, %{client_pid: client_pid}}
  end

  @impl true
  def handle_cast({:publish, topic, payload}, state) do
    # Publish a message with QoS 0.
    case :emqtt.publish(state.client_pid, topic, payload, [qos: 0]) do
      :ok ->
        Logger.info("Message published to #{topic}")
      {:error, :unknown_connection} ->
        Logger.error("Publish failed: unknown connection")
      error ->
        Logger.error("Publish error: #{inspect(error)}")
    end
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

