function yes_or_no {
    while true; do
        read -p "$* [y/n]: " yn
        case $yn in
            [Yy]*) return 0 ;;  
            [Nn]*) return 1 ;;
        esac
    done
}

cd $(dirname $0)
cd ..

if [[ -e cert ]]
then

if yes_or_no "Cert already exists. Remove old?"
then
echo "Removing folder"
rm cert -r
else
echo "Aborted"
exit 0
fi

fi

mkdir cert
cd cert
openssl genrsa -out rootCA.key 2048 &> /dev/null
(
echo "IR"
echo "Tehran"
echo "tehran"
echo "Foss pwa CA"
echo "security section"
echo "kalbasi"
echo "hamidrezakalbasi@protonmail.com"
) | openssl req -x509 -new -nodes -key rootCA.key -days 3650 -out rootCA.pem &> /dev/null

echo "generated root CA"
openssl genrsa -out device.key 2048 &> /dev/null

(
echo "IR"
echo "Tehran"
echo "tehran"
echo "Foss pwa foundation"
echo "security section"
echo "foss-pwa.vcap.me"
echo "hamidrezakalbasi@protonmail.com"
echo "password"
echo "foss pwa"
) | openssl req -new -key device.key -out device.csr &> /dev/null

openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 3650
