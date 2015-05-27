class CreateValues < ActiveRecord::Migration
  def change
    create_table :values do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
