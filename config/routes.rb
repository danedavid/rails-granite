Rails.application.routes.draw do
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
