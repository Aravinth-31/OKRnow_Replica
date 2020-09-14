class Api::V1::MasterdataController < ApplicationController
  def index
    data=MasterDatum.find_by(user:'master')
    render json:data
  end
  def update
    data=MasterDatum.find_by(user:params[:user])
    data.band=params[:band]
    data.desg=params[:desg]
    data.loc=params[:loc]
    data.costCent=params[:costCent]
    data.measType=params[:measType]
    data.specEmp=params[:specEmp]
    data.save()
    render json:data
  end
end
