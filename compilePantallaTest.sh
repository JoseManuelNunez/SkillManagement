dir=/usr/share/nginx/html
sudo unzip -o Archive.zip -d $dir/
service nginx restart
cd /home/orkapi/AppQT
sudo echo 1 > ArchiveConexionSocket
sudo rm -rf $dir/index.html  
sudo ln -s $dir/views/index.html $dir/index.html