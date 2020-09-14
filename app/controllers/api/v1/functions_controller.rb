class Api::V1::FunctionsController < ApplicationController
  def index
    functions = Function.all.order(created_at: :asc)
    render json:functions
  end

  def create
    function=Function.create(fname:params[:fname],rmngr:params[:rmngr])
    if function
      render json:function
    else
      render json:function.errors
    end
  end

  def show
  end

  def destroy
    id=params[:id]
    function=Function.where(:id => id).destroy_all()
    puts function
    if function
      render json:function
    else
      render json:function.errors
    end
  end
  def update
    id=params[:id]
    Function.where(:id=>id).update_all("fname = '"+params[:fname]+"'")
    function = Function.find_by(id:id)
    function.rmngr=params[:rmngr]
    function.save()
    if function
      render json:function
    else
      render json:function.errors
    end    
  end
end
