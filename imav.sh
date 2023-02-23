# !/bin/bash

#Updating version

echo "Updating Version"
cd /root/
wget https://repo.imunify360.cloudlinux.com/defence360/imunify-force-update.sh -O imunify-force-update.sh
bash imunify-force-update.sh

#update imunify AV
echo  "checking DB"
imunify-antivirus checkdb
echo "Checking Update status"
imunify-antivirus update

#Run scan to all User
echo "Run Scan"
imunify-antivirus malware user scan
