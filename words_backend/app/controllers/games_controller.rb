class GamesController < ApplicationController
  def show
    game = Game.where(difficulty: params[:level]).sample
    render json: game
  end
end
