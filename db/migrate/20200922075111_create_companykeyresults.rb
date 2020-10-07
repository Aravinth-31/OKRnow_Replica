class CreateCompanykeyresults < ActiveRecord::Migration[6.0]
  def change
    create_table :companykeyresults do |t|
      t.string :name
      t.decimal :percent, :precision=>5,:scale=>2,default:0.0
      t.integer :companyobjective_id
      t.text :desc
      t.string :due_date,default:''
      t.string :measure_type,default:'%'

      t.timestamps
    end
  end
end
