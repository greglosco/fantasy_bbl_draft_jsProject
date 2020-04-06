class PlayersController < ApplicationController

    def index
        players = Player.all
        render json: PlayerSerializer.new(players).to_serialized_json
    end

    def show 
        player = Player.find_by(id: params[:id])
        render json: PlayerSerializer.new(player).to_serialized_json
    end

end
