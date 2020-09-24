class Api::V2::ObjectivesController < ApplicationController
  # require 'roo'
  def index
    # data=ROO::Spreadsheet.open('C:/Users/ELCOT/Downloads/Employee_Sheet_Example.xlsx')
    objectives=Companykeyresult.joins(:companyobjective).where(companyobjectives:{id:1},companykeyresults:{id:1})
    render json: objectives
  end
  def companyObjectives
    objectives=Companyobjective.where(:quadrant=>params[:quadrant]).order(created_at: :asc)
    obs=[]
    objectives.map{|ob|
      obj=ob.as_json
      keyresults=Companykeyresult.joins(:companyobjective).where(companyobjectives:{id:ob[:id]})
      len=keyresults.length
      sum=0.0
      if(len==0)
        obj=obj.merge('percent'=>sum)
      else
        for i in keyresults
          sum+=i.percent
        end
        obj=obj.merge('percent'=>sum/len)
      end
      obs << obj
    }
    render json:obs
  end
  def keyResults
    keyresults=Companykeyresult.joins(:companyobjective).where(companyobjectives:{id:params[:id]})
    puts params[:id]
    render json: keyresults
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
    keyresult=Companykeyresult.where(id:params[:id]).destroy_all()
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
end
