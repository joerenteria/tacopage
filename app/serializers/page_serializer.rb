class EntrySerializer < ActiveModel::Serializer
  attributes :id, :directory, :title1, :image1, :content1, :title2, :image2, :content2, :title3, :image3, :content3
  has_one :user
end
