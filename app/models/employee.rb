class Employee < ApplicationRecord
    validates :ecode, presence: true
    validates :ename, presence: true
    validates :edept, presence: true
    validates :edesg, presence: true
    validates :eband, presence: true
    validates :eloc, presence: true
    validates :erole, presence: true
    validates :eemail, presence: true
    validates :emno, presence: true
    validates :edoj, presence: true
    validates :easal, presence: true
    validates :evpay, presence: true
    validates :ecost, presence: true
    validates :epassword, presence: true
end
