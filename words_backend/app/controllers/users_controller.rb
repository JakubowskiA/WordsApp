class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user, only: [:username]
  end

  def create
    user = User.create(:username)
    render json: user, only: [:username]
  end
end
