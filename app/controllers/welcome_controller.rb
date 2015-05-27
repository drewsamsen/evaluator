class WelcomeController < ApplicationController

  def index
    @values = Value.all.to_a
  end
end
