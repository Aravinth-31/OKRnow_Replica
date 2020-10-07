class Api::V1::DepartmentsController < ApplicationController
  def index
    departments = Department.all.order(created_at: :asc)
    puts departments
    render json:departments
  end

  def create
    department=Department.find_by(name:params[:name])
    if(!department)
      department=Department.create!(name:params[:name],reporting_manager:params[:reporting_manager])
    end
    if department
      render json:department
    else
      render json:department.errors
    end
  end

  def destroy
    department=Department.where(:id => params[:id].to_s).destroy_all()
    if department
      render json:department
    else
      render json:department.errors
    end
  end

  def update
    Department.where(:id=>params[:id].to_s).update_all("name = '"+params[:name]+"'")
    department=Department.find_by(id: params[:id])
    department.reporting_manager=params[:reporting_manager]
    department.save()
    if department
      render json:department
    else
      render json:department.errors
    end    
  end

end
