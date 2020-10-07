class Api::V2::EmpObjController < ApplicationController
  def index
  end
  def empObjectives
    objectives=Empobjective.where(:quadrant=>params[:quadrant]).order(created_at: :asc)
    obs=[]
    objectives.map{|ob|
      obj=ob.as_json
      keyresults=Empkey.joins(:empobjective).where(empobjectives:{id:ob[:id]})
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
  def keys
    keyresults=Empkey.joins(:empobjective).where(empobjectives:{id:params[:id]}).order(created_at: :asc)
    puts params[:id]
    render json: keyresults
  end
  def addEmpObjective
    objective=Empobjective.create(name:params[:name],quadrant:params[:quadrant],desc:params[:desc])
    if(objective)
      render json:objective
    else
      render json:objective.errors
    end
  end
  def addKeys
    key=Empkey.create(name:params[:name],desc:params[:desc],empobjective_id:params[:id])
    if(key)
      render json:key
    else
      render json:key.errors
    end
  end

end
