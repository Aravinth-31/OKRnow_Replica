class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :ecode, null: false
      t.string :ename, null: false
      t.string :edept, null: false
      t.string :edesg, null: false
      t.string :eband, null: false
      t.string :eloc, null: false
      t.string :erole, null: false
      t.string :eemail, null: false
      t.string :emno, null: false
      t.string :edoj, null: false
      t.string :easal, null: false
      t.string :evpay, null: false
      t.string :ezone, null: false
      t.string :ecost, null: false
      t.string :eteam, null: false
      t.string :eimg, default: 'https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png'
      t.string :epassword,null: false
      t.string :rmngr,array: true,default: []
      t.timestamps
    end
  end
end
