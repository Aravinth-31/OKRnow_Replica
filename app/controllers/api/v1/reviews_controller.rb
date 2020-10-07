class Api::V1::ReviewsController < ApplicationController
  def index
    reviews = Review.all.order(created_at: :asc)
    render json:reviews
  end

  def create
    review=Review.create!(reviews_params)
    if review
      render json:review
    else
      render json:review.errors
    end
  end

  def update
    id=params[:id]
    review=Review.find_by(id: id)
    Review.where(:id=>id).update_all("name='"+params[:name]+"',time_period_from='"+params[:time_period_from]+"',time_period_to='"+params[:time_period_to]+"',kr_deadline='"+params[:kr_deadline]+"',performance_check='"+params[:performance_check].to_s+"',bonus_layouts='"+params[:bonus_layouts].to_s+"',salary_revisions_and_promotions='"+params[:salary_revisions_and_promotions].to_s+"',elligibility_of_doj_before='"+params[:elligibility_of_doj_before]+"',club_review_period_from='"+params[:club_review_period_from]+"',club_review_period_to='"+params[:club_review_period_to]+"',manager_reviews_from='"+params[:manager_reviews_from]+"',manager_reviews_to='"+params[:manager_reviews_to]+"',hod_approval_deadline_from='"+params[:hod_approval_deadline_from]+"',hod_approval_deadline_to='"+params[:hod_approval_deadline_to]+"',hr_completion_from='"+params[:hr_completion_from]+"',hr_completion_to='"+params[:hr_completion_to]+"',end_of_process_from='"+params[:end_of_process_from]+"',end_of_process_to='"+params[:end_of_process_to]+"'")
    if review
      render json:review
    else
      render json:review.errors
    end    
  end

  def destroy
    id=params[:id]
    review=Review.where(:id => id).destroy_all()
    puts review
    if review
      render json:review
    else
      render json:review.errors
    end
  end
  private def reviews_params
    params.permit(:name,:time_period_from,:time_period_to,:kr_deadline,:performance_check,:bonus_layouts,:salary_revisions_and_promotions,:elligibility_of_doj_before,:club_review_period_from,:club_review_period_to,:manager_reviews_from,:manager_reviews_to,:hod_approval_deadline_from,:hod_approval_deadline_to,:hr_completion_from,:hr_completion_to,:end_of_process_from,:end_of_process_to)
  end
end
