class Deptobjective < ApplicationRecord
    has_many :deptkeyresult, dependent: :destroy
end
