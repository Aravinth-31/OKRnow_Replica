Rails.application.routes.draw do
  namespace :api do
    namespace :v2 do
      get 'emp_obj/index'
      post 'emp_obj/empObjectives'
      post 'emp_obj/keys'
      post 'emp_obj/addEmpObjective'
      post 'emp_obj/addKeys'

      get 'dept_obj/index'
      post 'dept_obj/deptObjectives'
      post 'dept_obj/keyResults'
      post 'dept_obj/addDeptObjective'
      post 'dept_obj/addDeptKr_It'
      post 'dept_obj/deleteDeptObj'
      post 'dept_obj/deleteDeptKr_It'
      post 'dept_obj/editDeptObj'
      post 'dept_obj/editDeptKr_It'

      post 'objectives/index'
      post 'objectives/companyObjectives'
      post 'objectives/keyResults'
      post 'objectives/addCompObjective'
      post 'objectives/addCompKeyresult'
      post 'objectives/deleteCompObj'
      post 'objectives/deleteCompKr'
      post 'objectives/editCompObj'
      post 'objectives/editCompKr'
    end
    namespace :v1 do
      get 'all_roles/allRoles'
      post 'all_roles/allPerms'
      resources :masterdata,only: [:index,:update]
      resources :employees,:functions,:teams,:reviews,:departments,:all_roles,only: [:index,:create,:destroy,:update]
      post 'teams/updateByEmp'
      post 'employees/updatepassword'
      post 'login/index'
    end
  end

  root 'pages#index'
  get '/*path' => 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
