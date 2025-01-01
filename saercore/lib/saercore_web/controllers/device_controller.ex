defmodule SaercoreWeb.DeviceController do
  use SaercoreWeb, :controller

  alias Saercore.Devices.Device
  alias Saercore.Devices

  action_fallback SaercoreWeb.FallbackController

  def index(conn, _params) do
    devices = Devices.list_devices()
    render(conn, :index, devices: devices)
  end

  def create(conn, %{"device" => device_params}) do
    with {:ok, %Device{} = device} <- Devices.create_device(device_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/devices/#{device}")
      |> render(:show, device: device)
    end
  end

  def update(conn, %{"id" => id, "device" => device_params}) do
    device = Devices.get_device!(id)

    with {:ok, %Device{} = device} <- Devices.update_device(device, device_params) do
      render(conn, :show, device: device)
    end
  end

  def delete(conn, %{"id" => id}) do
    device = Devices.get_device!(id)

    with {:ok, %Device{}} <- Devices.delete_device(device) do
      send_resp(conn, :no_content, "")
    end
  end
end
