class CreateRoleNames < ActiveRecord::Migration[6.0]
  def change
    create_table :role_names do |t|
      t.string :name, null: false
      t.integer :users ,default: 0
      t.timestamps
    end
  end
end
