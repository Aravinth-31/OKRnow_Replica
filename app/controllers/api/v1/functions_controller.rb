class Api::V1::FunctionsController < ApplicationController
  def index
    functions = Function.all.order(created_at: :asc)
    render json:functions
  end

  def create
    function=Function.find_by(name:params[:name])
    if(!function)
      function=Function.create(name:params[:name],reporting_manager:params[:reporting_manager])
    end
    if function
      render json:function
    else
      render json:function.errors
    end
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
    Function.where(:id=>id).update_all("name = '"+params[:name]+"'")
    function = Function.find_by(id:id)
    function.reporting_manager=params[:reporting_manager]
    function.save()
    if function
      render json:function
    else
      render json:function.errors
    end    
  end
end
