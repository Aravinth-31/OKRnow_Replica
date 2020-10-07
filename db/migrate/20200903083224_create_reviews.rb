class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :name
      t.string :time_period_from
      t.string :time_period_to
      t.string :kr_deadline
      t.boolean :performance_check
      t.boolean :bonus_layouts
      t.boolean :salary_revisions_and_promotions
      t.string :elligibility_of_doj_before
      t.string :club_review_period_from
      t.string :club_review_period_to
      t.string :manager_reviews_from
      t.string :manager_reviews_to
      t.string :hod_approval_deadline_from
      t.string :hod_approval_deadline_to
      t.string :hr_completion_from
      t.string :hr_completion_to
      t.string :end_of_process_from
      t.string :end_of_process_to

      t.timestamps
    end
  end
end