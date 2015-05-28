class ValueController < ApplicationController

  before_filter :check_admin, only: :create

  def index
    @values = Value.all.order(created_at: :asc)
    respond_to do |format|
      format.json {
        render :json => {
          :values => @values
        }
      }
    end
  end

  def create
    @value = Value.create(
      name: params[:name],
      description: params[:description]
    )
    respond_to do |format|
      format.json {
        render :json => {
          :value => @value
        }
      }
    end
  end

end
