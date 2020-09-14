Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'all_roles/index'
      post 'all_roles/create'
      post 'all_roles/update'
      get 'all_roles/allRoles'
      post 'all_roles/allPerms'
      post 'all_roles/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      post 'masterdata/update'
      get 'masterdata/index'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'roles/index'
      post 'roles/create'
      post 'roles/update'
      post 'roles/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'departments/index'
      post 'departments/create'
      post 'departments/update'
      post 'departments/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'reviews/index'
      post 'reviews/create'
      post 'reviews/update'
      post 'reviews/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'teams/index'
      post 'teams/create'
      post 'teams/update'
      post 'teams/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'functions/index'
      post 'functions/create'
      get 'functions/show'
      post 'functions/destroy'
      post 'functions/update'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'employees/index'
      post 'employees/create'
      get 'employees/show'
      post 'employees/destroy'
      post 'employees/update'
      post 'employees/updatepassword'
    end
  end
  namespace :api do
    namespace :v1 do
      post 'login/index'
      get 'login/create'
      get 'login/show'
      get 'login/destroy'
    end
  end
  root 'pages#index'
  # namespace :api do
  #   namespace :v1 do
  #     get 'recipes/index'
  #     post 'recipes/create'
  #     get '/show/:id', to: 'recipes#show'
  #     delete '/destroy/:id', to: 'recipes#destroy'
  #   end
  # end
  get '/*path' => 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
