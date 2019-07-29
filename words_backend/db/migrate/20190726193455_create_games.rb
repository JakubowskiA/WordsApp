class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.text :letters
      t.string :difficulty

      t.timestamps
    end
  end
end
