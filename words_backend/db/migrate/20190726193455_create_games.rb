class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.text :letters
      t.text :possibilities

      t.timestamps
    end
  end
end
