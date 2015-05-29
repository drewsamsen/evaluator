class MatchResultController < ApplicationController

  def index
    results = MatchResult.all.order(created_at: :asc)

    respond_to do |format|
      format.json {
        render :json => {
          :results => results
        }
      }
    end

  end
end
