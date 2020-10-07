class CreateEmpkeys < ActiveRecord::Migration[6.0]
  def change
    create_table :empkeys do |t|
      t.string :name
      t.decimal :percent, :precision=>5,:scale=>2,default:0.0
      t.text :desc
      t.string :duedate
      t.string :meastype,default:'%'
      t.integer :empobjective_id

      t.timestamps
    end
  end
end
