class User < ApplicationRecord
  has_secure_password
  serialize :scores
  validates :name, uniqieness: :true
end
