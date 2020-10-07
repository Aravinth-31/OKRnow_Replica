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

ActiveRecord::Schema.define(version: 2020_09_30_174313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "all_roles", force: :cascade do |t|
    t.string "section"
    t.string "permit"
    t.boolean "have"
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

  create_table "companykeyresults", force: :cascade do |t|
    t.string "name"
    t.decimal "percent", precision: 5, scale: 2, default: "0.0"
    t.integer "companyobjective_id"
    t.text "desc"
    t.string "due_date", default: ""
    t.string "measure_type", default: "%"
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
    t.string "name", null: false
    t.string "reporting_manager", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "deptkeyresults", force: :cascade do |t|
    t.string "name"
    t.decimal "percent", precision: 5, scale: 2, default: "0.0"
    t.text "desc"
    t.string "duedate"
    t.string "meastype", default: "%"
    t.integer "deptobjective_id"
    t.boolean "iskey"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "deptobjectives", force: :cascade do |t|
    t.string "name"
    t.string "desc"
    t.string "quadrant"
    t.string "employee", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "empkeys", force: :cascade do |t|
    t.string "name"
    t.decimal "percent", precision: 5, scale: 2, default: "0.0"
    t.text "desc"
    t.string "duedate"
    t.string "meastype", default: "%"
    t.integer "empobjective_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string "name", null: false
    t.string "code"
    t.string "dept", null: false
    t.string "desg", null: false
    t.string "band", null: false
    t.string "location", null: false
    t.string "role", default: ""
    t.string "email", null: false
    t.string "mobile_no", null: false
    t.string "doj", null: false
    t.string "annual_salary", default: ""
    t.string "variable_pay", default: ""
    t.string "zone", null: false
    t.string "cost", default: ""
    t.string "team", null: false
    t.string "image", default: "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"
    t.string "password", null: false
    t.string "reporting_manager", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "empobjectives", force: :cascade do |t|
    t.string "name"
    t.string "desc"
    t.string "quadrant"
    t.string "employee", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "functions", force: :cascade do |t|
    t.string "name", null: false
    t.string "reporting_manager", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "master_data", force: :cascade do |t|
    t.string "user"
    t.string "band", default: [], array: true
    t.string "desg", default: [], array: true
    t.string "location", default: [], array: true
    t.string "cost_center", default: [], array: true
    t.string "measure_type", default: [], array: true
    t.string "special_employee", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string "name"
    t.string "time_period_from"
    t.string "time_period_to"
    t.string "kr_deadline"
    t.boolean "performance_check"
    t.boolean "bonus_layouts"
    t.boolean "salary_revisions_and_promotions"
    t.string "elligibility_of_doj_before"
    t.string "club_review_period_from"
    t.string "club_review_period_to"
    t.string "manager_reviews_from"
    t.string "manager_reviews_to"
    t.string "hod_approval_deadline_from"
    t.string "hod_approval_deadline_to"
    t.string "hr_completion_from"
    t.string "hr_completion_to"
    t.string "end_of_process_from"
    t.string "end_of_process_to"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "role_names", force: :cascade do |t|
    t.string "name", null: false
    t.integer "users", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.string "dept", default: ""
    t.string "users", default: [], array: true
    t.string "reporting_manager", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end
end
