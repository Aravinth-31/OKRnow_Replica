class Api::V2::ObjectivesController < ApplicationController
  # require 'roo'
  def index
    # data=Roo::Spreadsheet.open('C:/Users/ELCOT/Downloads/Employee_Sheet_Example.xlsx')
    # data = Companykeyresult.where(:companyobjective_id=>9).group(:companyobjective_id).select("sum(percent) as percent","count(percent) as count")
    puts '**************************************'
    puts params[:iskey]
    puts '**************************************'
    render json:params.inspect
  end
  def companyObjectives
    if(params[:quadrant])
      objectives=Companyobjective.where(:quadrant=>params[:quadrant]).order(created_at: :asc)
    else
      objectives=Companyobjective.all.order(created_at: :asc)
    end
    obs=[]
    objectives.each do |objective|
      objective=objective.as_json
      percent1 = Companykeyresult.where(:companyobjective_id=>objective['id'].to_s).group(:companyobjective_id).select("sum(percent) as percent","count(percent) as count")
      percent2= Deptobjective.where(:companyobjective_id=>objective['id'].to_s).group(:companyobjective_id).select("sum(percent) as percent","count(percent) as count")
      sum=0.0
      len=0
      if(percent1.length==1)
        sum+=percent1[0].percent
        len+=percent1[0].count
      end
      if(percent2.length==1)
        sum+=percent2[0].percent
        len+=percent2[0].count
      end
      objective=objective.merge('percent'=>sum/len)
      obs << objective
    end
    render json:obs
  end
  def keyResults
    keyresults=Companykeyresult.joins(:companyobjective).where(companyobjectives:{id:params[:id]}).order(created_at: :asc)
    deptObjectives=Deptobjective.joins(:companyobjective).where(companyobjectives:{id:params[:id]}).order(created_at: :asc)
    render json: keyresults+deptObjectives
  end
  def addCompObjective
    objective=Companyobjective.create(name:params[:name],quadrant:params[:quadrant],desc:params[:desc])
    if(objective)
      render json:objective
    else
      render json:objective.errors
    end
  end
  def addCompKeyresult
    keyresult=Companykeyresult.create(name:params[:name],desc:params[:desc],companyobjective_id:params[:id])
    if(keyresult)
      render json:keyresult
    else
      render json:keyresult.errors
    end
  end
  def deleteCompObj
    objective=Companyobjective.where(id:params[:id]).destroy_all()
    if(objective)
      render json:objective
    else
      render json:objective.errors
    end
  end
  def deleteCompKr
    if params[:iskey]
      keyresult=Companykeyresult.where(id:params[:id]).destroy_all
    else
      keyresult=Deptobjective.where(id:params[:id]).destroy_all
    end
    if(keyresult)
      render json:keyresult
    else
      render json:keyresult.errors
    end
  end
  def editCompObj
    objective=Companyobjective.find_by(id:params[:id])
    if objective
      objective.name=params[:name]
      objective.save()
      render json:objective
    else
      render json:objective.errors
    end
  end
  def editCompKr
    if params[:iskey]
      keyresult=Companykeyresult.where(id:params[:id]).update_all("name='"+params[:name]+"',measure_type='"+params[:percent]+"',due_date='"+params[:due]+"'")
    else
      keyresult=Deptobjective.where(id:params[:id]).update_all("name='"+params[:name]+"',measure_type='"+params[:percent]+"',due_date='"+params[:due]+"'")
    end
    if keyresult
      render json:keyresult
    else
      render json:keyresult.errors
    end
  end
end
