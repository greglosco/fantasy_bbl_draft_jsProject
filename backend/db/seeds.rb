# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

12.times do 
    owner = Owner.create(
        name: Faker::Name.name,
        teamname: Faker::Team.name
    )
     
        Player.create(
            name: Faker::Sports::Basketball.player,
            team: Faker::Sports::Basketball.team,
            position: "Point Guard",
            owner_id: owner.id
        )

        Player.create(
            name: Faker::Sports::Basketball.player,
            team: Faker::Sports::Basketball.team,
            position: "Shooting Guard",
            owner_id: owner.id
        )

        Player.create(
            name: Faker::Sports::Basketball.player,
            team: Faker::Sports::Basketball.team,
            position: "Small Forward",
            owner_id: owner.id
        )

        Player.create(
            name: Faker::Sports::Basketball.player,
            team: Faker::Sports::Basketball.team,
            position: "Power Forward",
            owner_id: owner.id
        )

        Player.create(
            name: Faker::Sports::Basketball.player,
            team: Faker::Sports::Basketball.team,
            position: "Center",
            owner_id: owner.id
        )
end


