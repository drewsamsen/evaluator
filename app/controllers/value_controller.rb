class ValueController < ApplicationController

  before_filter :check_admin, only: [:create, :update]
  before_filter :get_values, only: [:index, :players]

  def index
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
    respond_to do |format|
      format.json {
        render :json => {
          :values => @values.shuffle
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
    unless params[:winner] && params[:winner][:id] &&
      params[:loser] && params[:loser][:id]
      return render :json => { :errors => 'Invalid' }, :status => 500
    end

    winner = params[:winner]
    loser = params[:loser]

    new_winner_score, new_loser_score = calculate_scores(winner, loser)

    @winning_score = Score.where("user_id = ? AND value_id = ?", current_user.id, winner[:id]).first
    @losing_score = Score.where("user_id = ? AND value_id = ?", current_user.id, loser[:id]).first

    if @winning_score
      @winning_score.update(score: new_winner_score)
    else
      Score.create(
        user_id: current_user.id,
        value_id: winner[:id],
        score: new_winner_score
      )
    end

    if @losing_score
      @losing_score.update(score: new_loser_score)
    else
      Score.create(
        user_id: current_user.id,
        value_id: loser[:id],
        score: new_loser_score
      )
    end

    @result = MatchResult.create(
      user_id: current_user.id,
      winner_id: winner[:id],
      loser_id: loser[:id]
    )

    respond_to do |format|
      format.json {
        render :json => {
          winnerId: winner[:id],
          winnerScore: new_winner_score,
          loserId: loser[:id],
          loserScore: new_loser_score
        }
      }
    end
  end

  private

  def get_values
    @values = Value.all.order(created_at: :asc)
    @scores = Score.where(user_id: current_user.id)

    scores_as_hash = {}
    @scores.each do |score|
      scores_as_hash[score.value_id] = score
    end

    # TODO 'attributes' is an expensive method, I think...
    @values.to_a.map!{ |v| v.attributes }

    # If there is a score for this value, get it, otherwise use default value
    # of 700
    @values.each do |value|
      if scores_as_hash[value['id']]
        value['score'] = scores_as_hash[value['id']].score
      else
        value['score'] = 700
      end
    end

    # Sort with highest value items first
    @values.to_a.sort_by! {|v| -v['score'] }

  end

  def calculate_scores(winner, loser)
    r_win = winner[:score].to_d
    r_lose = loser[:score].to_d

    # helper quotient
    q_win = 10 ** (r_win / 400)
    q_lose = 10 ** (r_lose / 400)

    # expectations
    e_win = q_win / (q_win + q_lose)
    e_lose = q_lose / (q_win + q_lose)

    add_to_winner = 32 * (1 - e_win)
    subtract_from_loser = 32 * (0 - e_lose)

    new_winner_score = (r_win + add_to_winner).round
    new_loser_score = (r_lose + subtract_from_loser).round

    [new_winner_score, new_loser_score]
  end

end
