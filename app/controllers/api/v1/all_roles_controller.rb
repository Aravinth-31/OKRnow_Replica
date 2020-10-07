class Api::V1::AllRolesController < ApplicationController
  def index
    all_roles={}
    AllRole.select(:section,"min(created_at) as min_created").group(:section).order('min_created').each do |role|
      all_roles[role.section]={}
      AllRole.select(:id,:permit,:have).where(:section=>role.section).each do |permit|
        all_roles[role.section][permit.permit]=permit
      end
    end
    render json: all_roles
  end
  def allRoles
    roles=RoleName.all.order(created_at: :asc)
    render json:roles
  end
  def allPerms
    permsid=Allpermission.where(:role_name_id=>params[:id].to_s).pluck(:perm_id)
    rolesList={}
    AllRole.all.order(created_at: :asc).each do |role|
      have=false
      if permsid.include?(role.id)
        have=true
      end
      if rolesList[role.section]
        rolesList[role.section][role.permit]={:id=>role.id,:name=>role.permit,:have=>have}
      else
        rolesList[role.section]={}
        rolesList[role.section][role.permit]={:id=>role.id,:name=>role.permit,:have=>have}
      end
    end
    render json: rolesList
  end
  def create
    role=RoleName.find_by(name:params[:name])
    if !role
      role=RoleName.create(name:params[:name])
    end
    for i in params[:roles]
      for j in i[1]
        if j[1][:have]
          perm=Allpermission.find_by(role_name_id:role.id,perm_id:j[1][:id],perm_name:j[1][:name])
          if !perm
            Allpermission.create(role_name_id:role.id,perm_id:j[1][:id],perm_name:j[1][:name])
          end
        end
      end
    end
    render json:{:result=>'Created'}
  end
  def update
    for i in params[:roles]
      for j in i[1]
        if j[1][:have]
          perm=Allpermission.find_by(role_name_id:params[:id],perm_id:j[1][:id],perm_name:j[1][:name])
          if !perm
            Allpermission.create(role_name_id:params[:id],perm_id:j[1][:id],perm_name:j[1][:name])
          end
        else
          Allpermission.where(:role_name_id => params[:id],:perm_id =>j[1][:id]).destroy_all()
        end
      end
    end
    render json:{result:'updated'}
  end
  def destroy
    role=RoleName.where(:id => params[:id]).destroy_all()
    if role
      render json:role
    else
      render json:role.errors
    end
  end
end