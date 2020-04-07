# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'Faker'

12.times do 
    owner = Owner.create(
        name: Faker::Name.name,
        teamname: Faker::Team.name
    )
    10.times do 
        Player.create(
            name: Faker::Sports::Basketball.player,
            team: Faker::Sports::Basketball.team,
            position: Faker::Sports::Basketball.position,
            owner_id: owner.id
        )
    end

end


