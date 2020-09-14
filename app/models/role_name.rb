class RoleName < ApplicationRecord
    validates :name, presence: true
    has_many :allpermission, dependent: :destroy
end
