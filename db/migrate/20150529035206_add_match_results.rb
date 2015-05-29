class AddMatchResults < ActiveRecord::Migration
  def change
    create_table :match_results do |t|
      t.integer :user_id
      t.integer :winner_id
      t.integer :loser_id

      t.timestamps
    end
  end
end
