# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# Heroko does not automatically configure ActionMailer since this app is on the
# Cedar stack (Bamboo stack is auto-setup)
ActionMailer::Base.smtp_settings = {
  :address        => 'smtp.sendgrid.net',
  :port           => '587',
  :authentication => :plain,
  :user_name      => ENV['SENDGRID_USERNAME'], # 'app37253305@heroku.com',
  :password       => ENV['SENDGRID_PASSWORD'], # 'l7ylyxtv4389',
  :domain         => 'heroku.com',
  :enable_starttls_auto => true
}