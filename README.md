# okta-challenge

<h3> Prerequisites </h3>
<hr>
<ul>
<li> Java Installation (this example runs on JDK 12) </li>
<li> Maven </li>
<li> Create react app </li>
<li> Postman for testing </li>
<li> IDE of choice </li>
</ul>

<h3> 0. Create an application in Okta </h3>
<hr>
<p> Register your application by selecting Applications > Add Application. On the next screen, choose Single Page App and click Next. </p>

```ruby
BaseURI: "http://localhost:8080"
LoginRedirect URI: "http://localhost:8080/login/callback"
LogoutRedirect URI: "http://localhost:8080"
```

<h3> 1. Set up your environment variables </h3>
<p> While there are many other possible environment variables that can / should be set to secure your app, below contains the minimum to get started </p> 

```ruby
ISSUER= "https://yourOktaDomain.com/oauth2/default"
CLIENT_ID= "123xxxxx123"
JAVA_HOME= /path/to/your/jdk
```

<h3> 2. React front end </h3>

```ruby
cd custom-login
npm install
npm start
```

<h3> 3. Set up the resource server </h3>

```ruby
cd resource-server
mvn -Dokta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
```

<h3> 4. If needed, set up a proxy for HTTP requests </h3>
<p> I used <a href=https://github.com/Rob--W/cors-anywhere> CORS Anywhere </a> </p>
