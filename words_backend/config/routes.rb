Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #game routes
  get "/games/:level", to: "games#show"

  get "/users" => "users#index"
  get "/users/:id", to: "users#show"
  post "/users", to: "users#create"
  patch "/users/:id", to: "users#update"
end
