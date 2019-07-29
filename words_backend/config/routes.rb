Rails.application.routes.draw do
  get 'games/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users

  #game routes
  get "/games/:id", to: "games#show"

  # get "/users" => "users#index"
  # get "/users/:id", to: "users#show"
  # post "/users", to: "users#create"
end
