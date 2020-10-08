class CreateDeptobjectives < ActiveRecord::Migration[6.0]
  def change
    create_table :deptobjectives do |t|
      t.string :name
      t.string :desc
      t.string :quadrant,default:'Q1'
      t.string :employee,default:''
      t.decimal :percent, :precision=>5,:scale=>2,default:0.0
      t.integer :companyobjective_id
      t.string :due_date,default:''
      t.string :measure_type,default:'%'
      t.boolean :iskey,default:false

      t.timestamps
    end
  end
end
