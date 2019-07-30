class AddPossibilitiesToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :possibilities, :text
  end
end
