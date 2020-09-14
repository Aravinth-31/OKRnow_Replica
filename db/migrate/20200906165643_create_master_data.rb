class CreateMasterData < ActiveRecord::Migration[6.0]
  def change
    create_table :master_data do |t|
      t.string :user
      t.string :band,array: true,default: []
      t.string :desg,array: true,default: []
      t.string :loc,array: true,default: []
      t.string :costCent,array: true,default: []
      t.string :measType,array: true,default: []
      t.string :specEmp,array: true,default: []

      t.timestamps
    end
  end
end
