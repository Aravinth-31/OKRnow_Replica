class Empobjective < ApplicationRecord
    has_many :empkey, dependent: :destroy
end
