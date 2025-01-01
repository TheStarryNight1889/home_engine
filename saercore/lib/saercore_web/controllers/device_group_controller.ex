defmodule SaercoreWeb.DeviceGroupController do
  use SaercoreWeb, :controller

  alias Saercore.DeviceGroups
  alias Saercore.DeviceGroups.DeviceGroup

  action_fallback SaercoreWeb.FallbackController

  def index(conn, _params) do
    device_groups = DeviceGroups.list_device_groups()
    render(conn, :index, device_groups: device_groups)
  end

  def create(conn, %{"device_group" => device_group_params}) do
    with {:ok, %DeviceGroup{} = device_group} <-
           DeviceGroups.create_device_group(device_group_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/device-groups/#{device_group}")
      |> render(:show, device_group: device_group)
    end
  end

  def show(conn, %{"id" => id}) do
    device_group = DeviceGroups.get_device_group!(id)
    render(conn, :show, device_group: device_group)
  end

  def update(conn, %{"id" => id, "device_group" => device_group_params}) do
    device_group = DeviceGroups.get_device_group!(id)

    with {:ok, %DeviceGroup{} = device_group} <-
           DeviceGroups.update_device_group(device_group, device_group_params) do
      render(conn, :show, device_group: device_group)
    end
  end

  def delete(conn, %{"id" => id}) do
    device_group = DeviceGroups.get_device_group!(id)

    with {:ok, %DeviceGroup{}} <- DeviceGroups.delete_device_group(device_group) do
      send_resp(conn, :no_content, "")
    end
  end
end
