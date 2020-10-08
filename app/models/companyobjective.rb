class Companyobjective < ApplicationRecord
    has_many :companykeyresult, dependent: :destroy
    has_many :deptobjective
end
