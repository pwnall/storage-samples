# Sample code for Web Storage APIs



## Testing

Any method that serves the local files work. The following is what the author
uses.

```bash
npm install -g http-server
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem
http-server -S
```

Some of the Web Storage APIs used here are deprecated / not yet shipped.

```bash
openssl pkey -in key.pem -outform der -pubout | \
   openssl dgst -sha256 -binary | base64 > cert-spki.txt
google-chrome --enable-experimental-web-platform-features \
    --ignore-certificate-errors-spki-list=$(cat cert-spki.txt) \
    --user-data-dir=/tmp/testing https://localhost:8080
```
