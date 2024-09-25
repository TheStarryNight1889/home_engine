defmodule Saercore.Repo do
  use Ecto.Repo,
    otp_app: :saercore,
    adapter: Ecto.Adapters.Postgres
end
