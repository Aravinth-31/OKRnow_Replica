class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :rname
      t.string :tpfrom
      t.string :tpto
      t.string :krd
      t.boolean :perchk
      t.boolean :bonlay
      t.boolean :salrp
      t.string :edoj
      t.string :crpfrom
      t.string :crpto
      t.string :mrfrom
      t.string :mrto
      t.string :hodfrom
      t.string :hodto
      t.string :hrfrom
      t.string :hrto
      t.string :eopfrom
      t.string :eopto

      t.timestamps
    end
  end
end