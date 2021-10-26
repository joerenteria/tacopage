class CreateEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :pages do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :directory

      t.string :title1
      t.text :content1
      t.string :image1

      t.string :title2
      t.text :content2
      t.string :image2

      t.string :title3
      t.text :content3
      t.string :image3

      t.timestamps
    end
  end
end
