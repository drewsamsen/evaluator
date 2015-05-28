class UserController < ApplicationController

  def index
    @users = User.all.order(created_at: :asc)

    respond_to do |format|
      format.json {
        render :json => {
          :users => @users
        }
      }
    end

  end
end
