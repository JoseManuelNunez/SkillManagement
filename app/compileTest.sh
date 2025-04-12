# scp dist/Archive.zip orkapi@192.168.0.211:/home/orkapi
# ssh orkapi@192.168.0.211 'sudo sh /home/orkapi/compilePantallaTest.sh'
green=`tput setaf 2`
red=`tput setaf 1`
dir=$(pwd)
npm run build
# cp -R "$dir/app/assets/images"  "$dir/dist/assets/images"
ip=192.168.0.122
cFile="Archive.zip"
cd dist
zip -r $cFile *
cd ..
size=$(du -m dist/Archive.zip | cut -f1)
size=$(expr $size + 0)

if [ $size -lt 300 ] ; then
  scp dist/Archive.zip orkapi@$ip:/home/orkapi
  scp compilePantallaTest.sh orkapi@$ip:/home/orkapi
  ssh orkapi@$ip 'sudo sh /home/orkapi/compilePantallaTest.sh'
  rm -rf "dist/Archive.zip"
  echo " ${green} FILE SIZE => ${size}MB"
else
  echo " ${red} FILE SIZE => ${size}MB"
fi


# ip=192.168.0.164
# scp dist/Archive.zip orkapi@$ip:/home/orkapi
# scp compilePantallaTest.sh orkapi@$ip:/home/orkapi
# ssh orkapi@$ip 'sudo sh /home/orkapi/compilePantallaTest.sh'
