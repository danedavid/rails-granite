class ApplicationController < ActionController::Base
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
end
