defmodule DeviSim.Application do
  @moduledoc """
  This module defines the application and its supervision tree.
  """
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {DeviSim.MqttClient, []},
      {DeviSim.Simulator, []}
    ]

    opts = [strategy: :one_for_one, name: DeviSim.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
