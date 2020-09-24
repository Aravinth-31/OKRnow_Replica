# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_22_075111) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "all_roles", force: :cascade do |t|
    t.string "section"
    t.string "permit"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "allpermissions", force: :cascade do |t|
    t.integer "role_name_id"
    t.integer "perm_id"
    t.string "perm_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "authors", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "books", force: :cascade do |t|
    t.string "name"
    t.integer "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "companykeyresults", force: :cascade do |t|
    t.string "name"
    t.decimal "percent", precision: 5, scale: 2, default: "0.0"
    t.integer "companyobjective_id"
    t.text "desc"
    t.string "duedate", default: ""
    t.string "measType", default: "%"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "companyobjectives", force: :cascade do |t|
    t.string "name"
    t.string "quadrant"
    t.text "desc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "departments", force: :cascade do |t|
    t.string "dname", null: false
    t.string "rmngr", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string "ecode"
    t.string "ename", null: false
    t.string "edept", null: false
    t.string "edesg", null: false
    t.string "eband", null: false
    t.string "eloc", null: false
    t.string "erole", default: ""
    t.string "eemail", null: false
    t.string "emno", null: false
    t.string "edoj", null: false
    t.string "easal", default: ""
    t.string "evpay", default: ""
    t.string "ezone", null: false
    t.string "ecost", default: ""
    t.string "eteam", null: false
    t.string "eimg", default: "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"
    t.string "epassword", null: false
    t.string "rmngr", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "functions", force: :cascade do |t|
    t.string "fname", null: false
    t.string "rmngr", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "master_data", force: :cascade do |t|
    t.string "user"
    t.string "band", default: [], array: true
    t.string "desg", default: [], array: true
    t.string "loc", default: [], array: true
    t.string "costCent", default: [], array: true
    t.string "measType", default: [], array: true
    t.string "specEmp", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string "rname"
    t.string "tpfrom"
    t.string "tpto"
    t.string "krd"
    t.boolean "perchk"
    t.boolean "bonlay"
    t.boolean "salrp"
    t.string "edoj"
    t.string "crpfrom"
    t.string "crpto"
    t.string "mrfrom"
    t.string "mrto"
    t.string "hodfrom"
    t.string "hodto"
    t.string "hrfrom"
    t.string "hrto"
    t.string "eopfrom"
    t.string "eopto"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "role_names", force: :cascade do |t|
    t.string "name", null: false
    t.integer "users", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "rname", null: false
    t.integer "rusers", default: 0
    t.text "rperms", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "tname", null: false
    t.string "tdept", default: ""
    t.string "tusers", default: [], array: true
    t.string "rmngr", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
