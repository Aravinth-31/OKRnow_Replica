class Review < ApplicationRecord
    validates :name, presence: true
    validates :time_period_from, presence: true
    validates :time_period_to, presence: true
end