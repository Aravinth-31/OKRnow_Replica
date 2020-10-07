class Api::V1::MasterdataController < ApplicationController
  def index
    data=MasterDatum.find_by(user:'master')
    render json:data
  end
  def update
    data=MasterDatum.find_by(id:params[:id])
    data.band=params[:band]
    data.desg=params[:desg]
    data.location=params[:location]
    data.cost_center=params[:cost_center]
    data.measure_type=params[:measure_type]
    data.special_employee=params[:special_employee]
    data.save()
    render json:data
  end
end
