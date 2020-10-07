class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.string :dept, default:''
      t.string :users,array: true,default: []
      t.string :reporting_manager,array: true,default: []

      t.timestamps
    end
  end
end
