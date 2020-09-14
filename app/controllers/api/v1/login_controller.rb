class Api::V1::LoginController < ApplicationController
  def index
    puts params[:username]
    puts params[:password]
    if params[:username]=="admin@gmail.com" and params[:password]=='admin'
      render json: {message:'success'}
    else
      render json: {message:'failure'}
    end
  end

  def create
  end

  def show
  end

  def destroy
  end
end
