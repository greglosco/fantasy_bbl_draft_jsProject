class OwnersController < ApplicationController

    def index
        owners = Owner.all
        render json: OwnerSerializer.new(owners).to_serialized_json
    end

    def show 
        owner = Owner.find(params[:id])
        render json: OwnerSerializer.new(owner).to_serialized_json
    end

end
