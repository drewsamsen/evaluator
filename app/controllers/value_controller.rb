class ValueController < ApplicationController

  def index
    @values = Value.all

    respond_to do |format|
      format.json {
        render :json => {
          :values => @values
        }
      }
    end

  end
end
