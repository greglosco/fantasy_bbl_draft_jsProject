class PlayersController < ApplicationController

    def index
        players = Player.all
        render json: PlayerSerializer.new(players).to_serialized_json
    end

    def show 
        player = Player.find_by(id: params[:id])
        render json: PlayerSerializer.new(player).to_serialized_json
    end

    def update
        player = Player.find_by(id: params[:id])
        player.update(player_params)
        render json: player
    end

    private

    def player_params
        params.require(:player).permit(:name)
    end

end
