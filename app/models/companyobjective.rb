class Companyobjective < ApplicationRecord
    has_many :companykeyresult, dependent: :destroy
end
