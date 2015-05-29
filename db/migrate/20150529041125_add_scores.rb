class AddScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :user_id
      t.integer :value_id
      t.integer :score

      t.timestamps
    end
  end
end
