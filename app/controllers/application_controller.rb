class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  helper_method :logged_in?, :current_user

  private

  def ensure_user_logged_in
    unless logged_in?
      respond_to do |format|
        format.html do
          redirect_to new_session_path
        end
        format.json { render status: :unauthorized, json: { error: "You do not have access" } }
      end
    end
  end

  def logged_in?
    current_user.present?
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end
  end

  def user_not_authorized
    flash[:warning] = "All accessable tasks are listed below"
    redirect_to root_path
  end
end
