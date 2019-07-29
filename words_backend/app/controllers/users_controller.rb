class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user, only: [:username]
  end

  def create
    # byebug
    user = User.find_or_create_by(username: params[:username])
    render json: user, only: [:username]
  end
end
