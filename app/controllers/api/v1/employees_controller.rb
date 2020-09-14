class Api::V1::EmployeesController < ApplicationController
  def index
    employees = Employee.all.order(created_at: :asc)
    render json:employees
  end

  def create
    employee=Employee.create(ecode:params[:ecode],ename:params[:ename],edept:params[:edept],edesg:params[:edesg],eband:params[:eband],eloc:params[:eloc],erole:params[:erole], eemail:params[:eemail], emno:params[:emno], edoj:params[:edoj], easal:params[:easal], evpay:params[:evpay], ezone:params[:ezone], ecost:params[:ecost], eteam:params[:eteam],epassword:params[:epassword],rmngr:params[:rmngr])
    if employee
      render json:employee
    else
      render json:employee.errors
    end
  end

  def show
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
    Employee.where(:id=>id).update_all("ecode = '"+params[:ecode]+"',ename='"+params[:ename]+"',edept='"+params[:edept]+"',edesg='"+params[:edesg]+"',eband='"+params[:eband]+"',eloc='"+params[:eloc]+"',erole='"+params[:erole]+"', eemail='"+params[:eemail]+"', emno='"+params[:emno]+"', edoj='"+params[:edoj]+"', easal='"+params[:easal]+"', evpay='"+params[:evpay]+"', ezone='"+params[:ezone]+"', ecost='"+params[:ecost]+"', eteam='"+params[:eteam]+"', epassword='"+params[:epassword]+"'")
    employee=Employee.find_by(id: id)
    employee.rmngr=params[:rmngr]
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
    employee.epassword=params[:enew]
    employee.save
    if employee
      render json: employee
    else
      rendere json: employee.errors
    end
  end
end
