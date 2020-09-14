class CreateAllRoles < ActiveRecord::Migration[6.0]
  def change
    create_table :all_roles do |t|
      t.string :section
      t.string :permit

      t.timestamps
    end
  end
end
