class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :tname, null: false
      t.string :tdept, default:''
      t.string :tusers,array: true,default: []
      t.string :rmngr,array: true,default: []

      t.timestamps
    end
  end
end
