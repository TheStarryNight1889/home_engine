defmodule DeviSim.MqttHandler do
  @moduledoc """
  A simple Tortoise handler that logs messages.
  """
  require Logger

  @behaviour Tortoise.Handler

  @impl true
  def connection(status, state) do
    Logger.info("Connection status: #{inspect(status)}")
    {:ok, state}
  end

  @impl true
  def init(_args) do
    {:ok, []}
  end

  @impl true
  def handle_message(topic, payload, state) do
    Logger.info("Received message on topic '#{topic}': #{inspect(payload)}")
    {:ok, state}
  end

  @impl true
  def terminate(reason, _state) do
    Logger.warning("Terminating handler: #{inspect(reason)}")
    :ok
  end

  @impl true
  def subscription(_status, _topic_filter, state) do
    {:ok, state}
  end
end
