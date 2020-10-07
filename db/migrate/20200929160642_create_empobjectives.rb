class CreateEmpobjectives < ActiveRecord::Migration[6.0]
  def change
    create_table :empobjectives do |t|
      t.string :name
      t.string :desc
      t.string :quadrant
      t.string :employee,default:''

      t.timestamps
    end
  end
end
