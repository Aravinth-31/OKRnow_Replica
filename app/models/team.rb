class Team < ApplicationRecord
    validates :tname, presence: true
    validates :tdept, presence: true
end
