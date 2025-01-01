defmodule SaercoreWeb.DeviceGroupControllerTest do
  use SaercoreWeb.ConnCase

  import Saercore.DeviceGroupsFixtures

  alias Saercore.DeviceGroups.DeviceGroup

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all device_groups", %{conn: conn} do
      conn = get(conn, ~p"/api/device_groups")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create device_group" do
    test "renders device_group when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/device_groups", device_group: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/device_groups/#{id}")

      assert %{
               "id" => ^id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/device_groups", device_group: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update device_group" do
    setup [:create_device_group]

    test "renders device_group when data is valid", %{conn: conn, device_group: %DeviceGroup{id: id} = device_group} do
      conn = put(conn, ~p"/api/device_groups/#{device_group}", device_group: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/device_groups/#{id}")

      assert %{
               "id" => ^id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, device_group: device_group} do
      conn = put(conn, ~p"/api/device_groups/#{device_group}", device_group: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete device_group" do
    setup [:create_device_group]

    test "deletes chosen device_group", %{conn: conn, device_group: device_group} do
      conn = delete(conn, ~p"/api/device_groups/#{device_group}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/device_groups/#{device_group}")
      end
    end
  end

  defp create_device_group(_) do
    device_group = device_group_fixture()
    %{device_group: device_group}
  end
end
