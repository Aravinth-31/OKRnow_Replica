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
    # Function.where(:id=>id).update_all("fname = '"+params[:fname]+"',fhod='"+params[:fhod]+"',ffrom='"+params[:ffrom]+"',fto='"+params[:fto]+"'")
    Review.where(:id=>id).update_all("rname='"+params[:rname]+"',tpfrom='"+params[:tpfrom]+"',tpto='"+params[:tpto]+"',krd='"+params[:krd]+"',perchk='"+params[:perchk].to_s+"',bonlay='"+params[:bonlay].to_s+"',salrp='"+params[:salrp].to_s+"',edoj='"+params[:edoj]+"',crpfrom='"+params[:crpfrom]+"',crpto='"+params[:crpto]+"',mrfrom='"+params[:mrfrom]+"',mrto='"+params[:mrto]+"',hodfrom='"+params[:hodfrom]+"',hodto='"+params[:hodto]+"',hrfrom='"+params[:hrfrom]+"',hrto='"+params[:hrto]+"',eopfrom='"+params[:eopfrom]+"',eopto='"+params[:eopto]+"'")
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
    params.permit(:rname,:tpfrom,:tpto,:krd,:perchk,:bonlay,:salrp,:edoj,:crpfrom,:crpto,:mrfrom,:mrto,:hodfrom,:hodto,:hrfrom,:hrto,:eopfrom,:eopto)
  end
end
