class CreateDepartments < ActiveRecord::Migration[6.0]
  def change
    create_table :departments do |t|
      t.string :dname, null: false
      t.string :rmngr,array: true,default: []
      t.timestamps
    end
  end
end
