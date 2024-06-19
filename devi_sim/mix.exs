defmodule DeviSim.MixProject do
  use Mix.Project

  def project do
    [
      app: :devi_sim,
      version: "0.1.0",
      elixir: "~> 1.17",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {DeviSim.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:yaml_elixir, "~>2.7"},
      {:tortoise, "~> 0.10.0"},
      {:jason, "~> 1.3"}
    ]
  end
end
