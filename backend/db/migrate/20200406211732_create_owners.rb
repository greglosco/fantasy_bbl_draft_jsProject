class CreateOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :owners do |t|
      t.string :name
      t.string :teamname
      t.has_many :players

      t.timestamps
    end
  end
end
