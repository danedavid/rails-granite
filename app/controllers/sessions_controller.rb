class SessionsController < ApplicationController
  def new
    render
  end

  def create
    user = User.find_by(email: params[:login][:email].downcase)
    if user && user.authenticate(params[:login][:password])
      session[:user_id] = user.id.to_s
      render status: :ok, json: { notice: "Succesfully logged in" }
    else
      render status: :not_found, json: { errors: ["Incorrect credentials, Try again."] }
    end
  end

  def destroy
    if session.delete(:user_id)
      render status: :ok, json: { notice: "Succesfully logged out" }
    else
      render status: :unprocessable_entity, json: { errors: ["Logout failed"] }
    end
  end
end
