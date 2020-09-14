class Review < ApplicationRecord
    validates :rname, presence: true
    validates :tpfrom, presence: true
    validates :tpto, presence: true
end