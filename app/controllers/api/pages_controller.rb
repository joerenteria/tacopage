class Api::PagesController < ApplicationController
    before_action :authorize

    def index
        pages = @current_user.pages
        render json: pages
    end

    # def index
    #     render json: Page.all
    # end
    def show
        page = @current_user.pages.find_by(id: params[:id])
        #byebug
        render json: page
    end

    def create
        page = @current_user.pages.create!(entry_params)
        directory = params[:directory]
            
        @image1 = params[:image1]
        @title1 = params[:title1]
        @content1 = params[:content1]

        @image2 = params[:image2]
        @title2 = params[:title2]
        @content2 = params[:content2]

        @image3 = params[:image3]
        @title3 = params[:title3]
        @content3 = params[:content3]
        if page
        
        Dir.mkdir("client/public/#{directory}")

        template = File.read('client/public/template.html.erb')
        result = ERB.new(template).result(binding)
        File.open("client/public/#{directory}/index.html" , "w") do |file|
        file.write result
        end
        template = File.read('client/public/mail.php.erb')
        contactform = ERB.new(template).result(binding)
        File.open("client/public/#{directory}/mail.php" , "w") do |file|
        file.write contactform
        end
        else
        render json: {error: "Ouch"}
    end

        render json: page, status: :created
    end
    def destroy
        page = @current_user.pages.find_by(id: params[:id])
        directory = params[:directory]
        if page         
        page.destroy
        FileUtils.remove_dir("client/public/#{directory}",true)
        render json: page
        #head :no_content
        else
        render json: {error: "Not Authorized"}
        end
    end


    def update
        page = @current_user.pages.find_by(id: params[:id])
        directory = params[:directory]
            
        @image1 = params[:image1]
        @title1 = params[:title1]
        @content1 = params[:content1]

        @image2 = params[:image2]
        @title2 = params[:title2]
        @content2 = params[:content2]

        @image3 = params[:image3]
        @title3 = params[:title3]
        @content3 = params[:content3]

        if page
            page.update(entry_params)
            FileUtils.remove_dir("client/public/#{directory}",true)

            Dir.mkdir("client/public/#{directory}")

            template = File.read('client/public/template.html.erb')
            result = ERB.new(template).result(binding)
            File.open("client/public/#{directory}/index.html" , "w") do |file|
            file.write result
            end
            template2 = File.read('client/public/mail.php.erb')
            contactform = ERB.new(template2).result(binding)
            File.open("client/public/#{directory}/mail.php" , "w") do |file|
            file.write contactform
            end
        else
            render json: {error: "Ouch"}
        end
    end



    private
    def entry_params
        params.permit(:directory,:title1,:image1,:content1,:title2,:image2,:content2,:title3,:image3,:content3)
    end


end
