class Game < ApplicationRecord
  serialize :letters
  serialize :possibilities
end
