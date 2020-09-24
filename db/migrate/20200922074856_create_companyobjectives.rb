class CreateCompanyobjectives < ActiveRecord::Migration[6.0]
  def change
    create_table :companyobjectives do |t|
      t.string :name
      t.string :quadrant
      t.text :desc

      t.timestamps
    end
  end
end
