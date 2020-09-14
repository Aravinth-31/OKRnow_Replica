class CreateFunctions < ActiveRecord::Migration[6.0]
  def change
    create_table :functions do |t|
      t.string :fname, null: false
      t.string :rmngr,array: true,default: []

      t.timestamps
    end
  end
end
