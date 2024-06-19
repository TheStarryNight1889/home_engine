defmodule DeviSim.ConfigParser do
  @moduledoc """
  This module is responsible for parsing the device configuration from YAML files.
  """
  @type t :: %__MODULE__{
          id: String.t(),
          version: String.t(),
          lwt: String.t(),
          handshake: String.t(),
          device_type: String.t(),
          data: %{
            temperature: %{start_range: float(), end_range: float()},
            humidity: %{start_range: float(), end_range: float()},
            co2: %{start_range: float(), end_range: float()}
          }
        }

  @enforce_keys [:id, :version, :lwt, :handshake, :device_type, :data]
  defstruct [:id, :version, :lwt, :handshake, :device_type, :data]

  @doc """
  Parses device configurations from the given YAML file path.
  """
  @spec parse_config!(Path.t()) :: [%__MODULE__{}]
  def parse_config!(file_path) do
    file_path
    |> File.read!()
    |> YamlElixir.read_from_string!()
    |> Enum.map(&parse_device!/1)
  end

  @doc """
  Parses a single device configuration from the given map.
  """
  def parse_device!(device) do
    with {:ok, id} <- Map.fetch(device, "id"),
         {:ok, version} <- Map.fetch(device, "version"),
         {:ok, lwt} <- Map.fetch(device, "lwt"),
         {:ok, handshake} <- Map.fetch(device, "handshake"),
         {:ok, device_type} <- Map.fetch(device, "device_type"),
         {:ok, data} <- Map.fetch(device, "data") do
      %__MODULE__{
        id: id,
        version: version,
        lwt: lwt,
        handshake: handshake,
        device_type: device_type,
        data: parse_data(data)
      }
    end
  end

  defp parse_data(data) do
    %{
      temperature: parse_range(data["temperature"]),
      humidity: parse_range(data["humidity"]),
      co2: parse_range(data["co2"])
    }
  end

  defp parse_range(range) do
    %{
      start_range: range["start_range"],
      end_range: range["end_range"]
    }
  end
end
