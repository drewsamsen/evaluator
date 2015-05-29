class ValueController < ApplicationController

  before_filter :check_admin, only: [:create, :update]

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

  # Get some values so we can score them
  #
  # TODO: a way to get values that haven't been scored lately? or is random good
  # enough...
  def players
    @values = Value.all.shuffle
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

  def show
    @value = Value.find(params[:id])
    respond_to do |format|
      format.json {
        render :json => {
          :value => @value
        }
      }
    end
  end

  def update
    @value = Value.find(params[:id])
    @value.update(name: params[:name], description: params[:description])
    respond_to do |format|
      format.json {
        render :json => {
          :value => @value
        }
      }
    end
  end

  def score
    respond_to do |format|
      format.json {
        render :json => {
          :score => ''
        }
      }
    end
  end

end
