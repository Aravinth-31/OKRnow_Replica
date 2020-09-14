class Department < ApplicationRecord
    validates :dname, presence: true
end
