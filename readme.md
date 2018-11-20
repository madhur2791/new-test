sudo apt-get update
sudo apt-get install nginx
sudo apt install php-fpm php-mysql


sudo nano /etc/nginx/sites-available/example.com

server {
        listen 80;
        root /var/www/html;
        index index.php index.html index.htm index.nginx-debian.html;
        server_name example.com;

        location / {
                try_files $uri $uri/ =404;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }
}


sudo ln -s /etc/nginx/sites-available/soundwavepic.com /etc/nginx/sites-enabled/

sudo systemctl reload nginx
sudo systemctl restart php7.2-fpm

sudo apt-get install php7.2-xml
sudo apt-get install php7.2-mbstring


sudo add-apt-repository ppa:mc3man/trusty-media  
sudo apt-get update
sudo apt-get install ffmpeg

"repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/PHP-FFMpeg/BinaryDriver.git"
    }
],

composer require php-ffmpeg/binary-driver=dev-master

composer require php-ffmpeg/php-ffmpeg

sudo add-apt-repository ppa:chris-needham/ppa
sudo apt-get update
sudo apt-get install audiowaveform

sudo apt-get install imagemagick
sudo apt-get install php-imagick


