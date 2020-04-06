class OwnerSerializer

    def initialize(owner_obj)
        @owner = owner_obj
    end

    def to_serialized_json
        options = {
            except: [:created_at, :updated_at]
        }
        @owner.to_json(options)
    end

end