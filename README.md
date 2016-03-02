# ibook_h5
ibookstar in h5

apache config
```
<VirtualHost localhost:80>
ProxyPass /api http://[ibook-server]
ProxyPass /bookbar http://[bookbar-server]
ProxyPassReverse /api http://[ibook-server]
ProxyPassReverse /bookbar http://[bookbar-server]
</VirtualHost>
```

run
```bash```
webpack-dev-server -d --hot --content-base ./
``````

then visit
```
http://localhost:8080/webpack-dev-server/
```
