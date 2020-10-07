class Api::V2::DeptObjController < ApplicationController
  def index
  end
  def deptObjectives
    objectives=Deptobjective.where(:quadrant=>params[:quadrant]).order(created_at: :asc)
    obs=[]
    objectives.map{|ob|
      obj=ob.as_json
      keyresults=Deptkeyresult.joins(:deptobjective).where(deptobjectives:{id:ob[:id]})
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
    keyresults=Deptkeyresult.joins(:deptobjective).where(deptobjectives:{id:params[:id]}).order(created_at: :asc)
    puts params[:id]
    render json: keyresults
  end
  def addDeptObjective
    objective=Deptobjective.create(name:params[:name],quadrant:params[:quadrant],desc:params[:desc])
    if(objective)
      render json:objective
    else
      render json:objective.errors
    end
  end
  def addDeptKr_It
    keyresult=Deptkeyresult.create(name:params[:name],desc:params[:desc],deptobjective_id:params[:id],iskey:params[:iskey])
    if(keyresult)
      render json:keyresult
    else
      render json:keyresult.errors
    end
  end
  def deleteDeptObj
    objective=Deptobjective.where(id:params[:id]).destroy_all()
    if(objective)
      render json:objective
    else
      render json:objective.errors
    end
  end
  def deleteDeptKr_It
    keyresult=Deptkeyresult.where(id:params[:id]).destroy_all()
    if(keyresult)
      render json:keyresult
    else
      render json:keyresult.errors
    end
  end
  def editDeptObj
    objective=Deptobjective.find_by(id:params[:id])
    if objective
      objective.name=params[:name]
      objective.save()
      render json:objective
    else
      render json:objective.errors
    end
  end
  def editDeptKr_It
    keyresult=Deptkeyresult.where(id:params[:id]).update_all("name='"+params[:name]+"',meastype='"+params[:percent]+"',duedate='"+params[:due]+"'")
    if keyresult
      render json:keyresult
    else
      render json:keyresult.errors
    end
  end
end
