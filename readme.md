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
