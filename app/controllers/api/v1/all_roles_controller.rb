class Api::V1::AllRolesController < ApplicationController
  def index
    allroles=AllRole.all.order(created_at: :asc)
    rolesList={}
    allroles.map do |role|
      if rolesList[role.section]
        rolesList[role.section][role.permit]={:id=>role.id,:name=>role.permit,:have=>false}
      else
        rolesList[role.section]={}
        rolesList[role.section][role.permit]={:id=>role.id,:name=>role.permit,:have=>false}
      end
    end
    puts rolesList
    render json:rolesList
  end
  def allRoles
    roles=RoleName.all.order(created_at: :asc)
    render json:roles
  end
  def allPerms
    perms=Allpermission.where(:role_name_id=>params[:id]).order(created_at: :asc)
    permsid=[]
    for i in perms
      permsid << i[:perm_id]
    end
    allroles=AllRole.all.order(created_at: :asc)
    rolesList={}
    allroles.map do |role|
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
    render json:{:result=>'Updated'}
  end
  def destroy
    id=params[:id]
    role=RoleName.where(:id => id).destroy_all()
    puts role
    if role
      render json:role
    else
      render json:role.errors
    end
  end
end