class Api::V1::TeamsController < ApplicationController
  def index
    teams = Team.all.order(created_at: :asc)
    render json:teams
  end
  def create
    team=Team.find_by(name:params[:name])
    if(!team)
      team=Team.create(name:params[:name],dept:params[:dept],users:params[:users],reporting_manager:params[:reporting_manager])
    else
      if(!team.users.include?params[:user])
        team.users << params[:user]
        team.save()
      end
    end
    if team
      render json:team
    else
      render json:team.errors
    end
  end
  def updateByEmp
    team=Team.find_by(name:params[:name])
    if(team)
      if(!team.users.include?params[:user])
        team.users << params[:user]
        team.save()
      end
    end
    team=Team.find_by(name:params[:oldTeam])
    if(team)
      team.users.delete(params[:user]);
      team.save()
    end
    render json:{message:'Success'}
  end
  def update
    id=params[:id]
    puts id
    team=Team.where(:id=>id).update_all("name = '"+params[:name]+"',dept='"+params[:dept]+"'")
    team=Team.find_by(id: id)
    team.users=params[:users]
    team.reporting_manager=params[:reporting_manager]
    team.save()
    if team
      render json:team
    else
      render json:team.errors
    end    
  end
  def destroy
    id=params[:id]
    team=Team.where(:id => id).destroy_all()
    puts team
    if team
      render json:team
    else
      render json:team.errors
    end
  end
end
