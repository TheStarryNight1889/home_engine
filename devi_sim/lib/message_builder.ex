defmodule DeviSim.MessageBuilder do
  @moduledoc """
  This module is responsible for taking device configs and building messages.
  """

  @doc """
  This function builds a message based on the device configuration.
  """
  @spec build_message({:lwt, %DeviSim.ConfigParser{}}) :: String.t()
  def build_message({:lwt, _device}) do
    Jason.encode!(%{status: false})
  end

  @spec build_message({:handshake, %DeviSim.ConfigParser{}}) :: String.t()
  def build_message({:handshake, device}) do
    Jason.encode!(%{device_type: device.device_type, version: device.version})
  end

  @spec build_message({:message, %DeviSim.ConfigParser{}}) :: String.t()
  def build_message({:message, device}) do
    data = device.data
    temperature = generate_random(data.temperature)
    humidity = generate_random(data.humidity)
    co2 = generate_random(data.co2)

    Jason.encode!(%{
      timestamp: DateTime.utc_now() |> DateTime.to_iso8601(),
      data: %{
        temperature: temperature,
        humidity: humidity,
        co2: co2
      }
    })
  end

  defp generate_random(range) do
    (:rand.uniform() * (range.end_range - range.start_range) + range.start_range)
    |> Float.round(2)
  end
end
