class Api::V1::EmployeesController < ApplicationController
  def index
    employees = Employee.all.order(created_at: :asc)
    render json:employees
  end

  def create
    employee=Employee.create(code:params[:code],name:params[:name],dept:params[:dept],desg:params[:desg],band:params[:band],location:params[:location],role:params[:role], email:params[:email], mobile_no:params[:mobile_no], doj:params[:doj], annual_salary:params[:annual_salary], variable_pay:params[:variable_pay], zone:params[:zone], cost:params[:cost], team:params[:team],password:params[:password],reporting_manager:params[:reporting_manager])
    if employee[:id]
      render json:employee
    else
      render json:employee.errors
    end
  end

  def destroy
    id=params[:id]
    employee=Employee.where(:id => id).destroy_all()
    puts employee
    if employee
      render json:employee
    else
      render json:employee.errors
    end
  end
  def update
    id=params[:id]
    Employee.where(:id=>id).update_all("code = '"+params[:code]+"',name='"+params[:name]+"',dept='"+params[:dept]+"',desg='"+params[:desg]+"',band='"+params[:band]+"',location='"+params[:location]+"',role='"+params[:role]+"', email='"+params[:email]+"', mobile_no='"+params[:mobile_no]+"', doj='"+params[:doj]+"', annual_salary='"+params[:annual_salary]+"', variable_pay='"+params[:variable_pay]+"', zone='"+params[:zone]+"', cost='"+params[:cost]+"', team='"+params[:team]+"', password='"+params[:password]+"'")
    employee=Employee.find_by(id: id)
    employee.reporting_manager=params[:reporting_manager]
    employee.save()
    if employee
      render json:employee
    else
      render json:employee.errors
    end    
  end
  def updatepassword
    id=params[:id]
    employee=Employee.find_by(id: id)
    employee.password=params[:enew]
    employee.save
    if employee
      render json: employee
    else
      rendere json: employee.errors
    end
  end
end
