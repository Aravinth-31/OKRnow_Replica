class CreateDeptobjectives < ActiveRecord::Migration[6.0]
  def change
    create_table :deptobjectives do |t|
      t.string :name
      t.string :desc
      t.string :quadrant
      t.string :employee,default:''

      t.timestamps
    end
  end
end
