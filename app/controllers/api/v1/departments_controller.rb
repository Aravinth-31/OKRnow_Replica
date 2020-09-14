class Api::V1::DepartmentsController < ApplicationController
  def index
    departments = Department.all.order(created_at: :asc)
    render json:departments
  end

  def create
    department=Department.create(dname:params[:dname],rmngr:params[:rmngr])
    if department
      render json:department
    else
      render json:department.errors
    end
  end

  def destroy
    id=params[:id]
    department=Department.where(:id => id).destroy_all()
    puts department
    if department
      render json:department
    else
      render json:department.errors
    end
  end

  def update
    id=params[:id]
    Department.where(:id=>id).update_all("dname = '"+params[:dname]+"'")
    department=Department.find_by(id: id)
    department.rmngr=params[:rmngr]
    department.save()
    if department
      render json:department
    else
      render json:department.errors
    end    
  end
end
