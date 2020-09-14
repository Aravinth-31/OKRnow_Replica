class CreateAllpermissions < ActiveRecord::Migration[6.0]
  def change
    create_table :allpermissions do |t|
      t.integer :role_name_id
      t.integer :perm_id
      t.string :perm_name
      t.timestamps
    end
  end
end
