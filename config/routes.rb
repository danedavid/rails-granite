require 'sidekiq/web'

Rails.application.routes.draw do
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username),
                                                ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_USERNAME'])) &
      ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password),
                                                  ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_PASSWORD']))
  end
  mount Sidekiq::Web, at: '/sidekiq'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :tasks
  resources :users, only: [:new, :create]
  resources :sessions, only: [:new, :create]
  resources :tasks do
    resources :status, only: [:update]
    resources :comments, only: [:create]
  end

  delete '/logout' => 'sessions#destroy'
end
