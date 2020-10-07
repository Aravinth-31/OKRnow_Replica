class CreateDepartments < ActiveRecord::Migration[6.0]
  def change
    create_table :departments do |t|
      t.string :name, null: false
      t.string :reporting_manager,array: true,default: []
      t.timestamps
    end
  end
end
