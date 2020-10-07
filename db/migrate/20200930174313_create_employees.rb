class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name,null: false
      t.string :code
      t.string :dept,null: false
      t.string :desg,null: false
      t.string :band,null: false
      t.string :location,null: false
      t.string :role,default:''
      t.string :email,null: false
      t.string :mobile_no,null: false
      t.string :doj,null: false
      t.string :annual_salary,default:''
      t.string :variable_pay,default:''
      t.string :zone,null: false
      t.string :cost,default:''
      t.string :team,null: false
      t.string :image,default:'https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png'
      t.string :password,null: false
      t.string :reporting_manager,array:true,default:[]

      t.timestamps
    end
  end
end
