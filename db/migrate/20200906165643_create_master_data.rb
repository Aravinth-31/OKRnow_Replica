class CreateMasterData < ActiveRecord::Migration[6.0]
  def change
    create_table :master_data do |t|
      t.string :user
      t.string :band,array: true,default: []
      t.string :desg,array: true,default: []
      t.string :location,array: true,default: []
      t.string :cost_center,array: true,default: []
      t.string :measure_type,array: true,default: []
      t.string :special_employee,array: true,default: []

      t.timestamps
    end
  end
end
