class UsersController < ApplicationController
  def index
    users = User.all.select { |user| user.highscore != nil }
    users = users.sort_by { |user| user.highscore }.reverse
    users = users[0...5]

    render json: users, only: [:username, :highscore, :longest_word]
  end

  def show
    user = User.find(params[:id])
    render json: user, only: [:username]
  end

  def create
    # byebug
    user = User.find_or_create_by(username: params[:username])

    if (user.longest_word == nil)
      user.longest_word = ""
    end
    render json: user, only: [:id, :username, :longest_word]
  end

  def update
    user = User.find(params[:id])
    if (user[:highscore] == nil)
      user[:highscore] = params[:highscore]
    elsif (params[:highscore] > user[:highscore])
      user[:highscore] = params[:highscore]
    end
    if (user.longest_word == nil)
      user.longest_word = params[:longest_word]
    elsif (user.longest_word.length < params[:longest_word].length)
      user.longest_word = params[:longest_word]
    end
    user.save
    render json: user, only: [:id, :username, :highscore]
  end
end
