class Api::V1::TeamsController < ApplicationController
  def index
    teams = Team.all.order(created_at: :asc)
    render json:teams
  end
  def create
    team=Team.find_by(tname:params[:tname])
    if(!team)
      team=Team.create(tname:params[:tname],tdept:params[:tdept],tusers:params[:tusers],rmngr:params[:rmngr])
    else
      if(!team.tusers.include?params[:user])
        team.tusers << params[:user]
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
    team=Team.find_by(tname:params[:tname])
    if(team)
      if(!team.tusers.include?params[:user])
        team.tusers << params[:user]
        team.save()
      end
    end
    team=Team.find_by(tname:params[:oldTeam])
    if(team)
      team.tusers.delete(params[:user]);
      team.save()
    end
    render json:{message:'Success'}
  end
  def update
    id=params[:id]
    puts id
    team=Team.where(:id=>id).update_all("tname = '"+params[:tname]+"',tdept='"+params[:tdept]+"'")
    team=Team.find_by(id: id)
    team.tusers=params[:tusers]
    team.rmngr=params[:rmngr]
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
