defmodule Saercore.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false
  alias Saercore.Mqtt

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      SaercoreWeb.Telemetry,
      Saercore.Repo,
      {DNSCluster, query: Application.get_env(:saercore, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Saercore.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Saercore.Finch},
      # Start a worker by calling: Saercore.Worker.start_link(arg)
      # {Saercore.Worker, arg},
      Mqtt.Client,
      Mqtt.Handler,
      # Start to serve requests, typically the last entry
      SaercoreWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Saercore.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    SaercoreWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
