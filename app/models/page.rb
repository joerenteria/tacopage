class Page < ApplicationRecord
  belongs_to :user
  validates :directory, presence: true
  validates :directory, uniqueness: true
  validates :directory, format: { with: /\A[a-z0-9]+\z/ }
  validates :title1, presence: true
  validates :content1, length: {minimum: 1}
end
