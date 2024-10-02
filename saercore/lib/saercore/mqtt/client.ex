defmodule Saercore.Mqtt.Client do
  @moduledoc false

  use GenServer
  alias Saercore.Mqtt.Handler

  def start_link([]) do
    GenServer.start_link(__MODULE__, [])
  end

  def init([]) do
    mqtt_opts = Application.get_env(:saercore, :mqtt)
    {:ok, pid} = :emqtt.start_link()

    state = %{
      pid: pid,
      client_id: mqtt_opts[:client_id]
    }

    {:ok, state, {:continue, :connect_and_subscribe}}
  end

  def handle_continue(
        :connect_and_subscribe,
        %{
          pid: pid
        } = state
      ) do
    {:ok, _} = :emqtt.connect(pid)
    topics = ["saercore/sensor/#", "saercore/connection/#"]

    Enum.each(topics, fn topic ->
      {:ok, _, _} = :emqtt.subscribe(pid, topic)
      IO.puts("Connected and subscribed to #{topic}")
      :ok
    end)

    {:noreply, state}
  end

  def handle_info({:publish, publish}, state) do
    Handler.handle_message(publish)
    {:noreply, state}
  end
end
