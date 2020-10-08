class Deptobjective < ApplicationRecord
    has_many :deptkeyresult, dependent: :destroy
    belongs_to :companyobjective
end
