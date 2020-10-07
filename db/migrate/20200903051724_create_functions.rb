class CreateFunctions < ActiveRecord::Migration[6.0]
  def change
    create_table :functions do |t|
      t.string :name, null: false
      t.string :reporting_manager,array: true,default: []

      t.timestamps
    end
  end
end
