class OwnerSerializer

    def initialize(owner_obj)
        @owner = owner_obj
    end

    def to_serialized_json
        options = {
            # include: {
            #     players: {
            #         only: [:id, :name, :position]
            #     }
            # },
            except: [:created_at, :updated_at]
        }
        @owner.to_json(options)
    end

end