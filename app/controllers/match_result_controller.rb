class MatchResultController < ApplicationController

  before_filter :check_admin

  def index
    results = MatchResult.all.order(id: :desc).limit(20);
    respond_to do |format|
      format.json {
        render :json => {
          :results => results
        }
      }
    end
  end
end
