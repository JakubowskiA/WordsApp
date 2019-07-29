Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users

  # get "/users" => "users#index"
  # get "/users/:id", to: "users#show"
  # post "/users", to: "users#create"
end
