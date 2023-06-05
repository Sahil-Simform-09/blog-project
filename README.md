# Blog application
## why we have to make delete request using fetch API?
- 
## why we can not redirect when request is make using fetch request?
- When making a request using the fetch API in client-side JavaScript, you cannot directly redirect the current browser window to a different URL. This is due to the security restrictions imposed by web browsers to prevent unauthorized redirects or malicious actions.
- The Same-Origin Policy is a fundamental security measure implemented by web browsers. It restricts web pages from making requests to different domains unless the target server explicitly allows it through Cross-Origin Resource Sharing (CORS) headers. These restrictions also apply to redirects.
- When a server responds with a redirect status code (e.g., 301 or 302), the fetch API in the browser will follow the redirect automatically by making a new request to the redirected URL. However, it will not update the browser's URL or perform a traditional page redirect that changes the visible URL in the address bar.
## res.redirect is not working in put request?
- The res.redirect() function in Express is primarily used for performing HTTP redirects in response to GET requests. It is not designed to be used directly in response to a PUT request or any other non-GET request.
- HTTP redirects are typically used to instruct the client to navigate to a different URL, and this behavior is more commonly associated with GET requests. When a PUT request is made, it is typically used to update or modify a resource on the server, rather than instructing the client to navigate to a different location.
- If you need to perform a redirect after processing a PUT request, you can consider using a different approach. For example, you can send a response with a specific status code (e.g., 303 - See Other) and include the target URL in the response body or headers. The client-side code can then  the response and perform the redirect based on the provided URL.
## what will be stored in cookie when we are working with authentication usinf sessions?
- When working with authentication using sessions, cookies are commonly used to store session identifiers or tokens. Here's an example of what might be stored in a cookie for authentication purposes:
    - Session ID: A session ID is a unique identifier assigned to a user's session. It is typically generated when a user logs in and is stored in a cookie. The session ID allows the server to associate subsequent requests with the correct session.
    - Remember Me Token: In some authentication systems, there is an option for users to stay logged in across multiple sessions or after closing the browser. In such cases, a "Remember Me" token may be stored in a cookie. This token is typically a long-lived token that can be used to automatically authenticate the user in subsequent sessions.
    - Expiration Information: The cookie may also contain information about when it expires. This allows the server to determine whether the session is still valid or if the user needs to re-authenticate.
    - Secure Flag: If the authentication process is performed over HTTPS, the cookie may include a "Secure" flag. This flag ensures that the cookie is only transmitted over a secure connection, providing additional security.
    - HttpOnly Flag: To mitigate the risk of cross-site scripting (XSS) attacks, the cookie may include an "HttpOnly" flag. This flag prevents client-side JavaScript from accessing the cookie, making it harder for attackers to steal session information.
- It's important to implement proper security measures when working with cookies for authentication, such as encrypting sensitive information, setting secure and HttpOnly flags, and properly validating and managing session identifiers to prevent session hijacking or other security vulnerabilities
## which type of value we should store in session store?
- When it comes to storing values in a session store, it is generally recommended to store small and essential pieces of information that are required to maintain the user's session or personalize their experience. Here are some examples of the types of values commonly stored in a session store:
    - User authentication status: You can store information about whether a user is authenticated or not. This can be useful for maintaining a user's logged-in state across multiple requests.
    - User preferences: Storing user preferences, such as theme selection, language preference, or display settings, allows you to personalize the user's experience.
    -Shopping cart data: If you have an e-commerce application, you can store the contents of a user's shopping cart in the session. This enables users to add items to their cart and retain them throughout their browsing session.
    - Flash messages: Flash messages are temporary messages that provide feedback or notifications to the user. Storing them in the session allows you to display them on subsequent pages after a redirect.
    - CSRF tokens: Cross-Site Request Forgery (CSRF) tokens are used to protect against malicious requests. Storing them in the session ensures that they are accessible across multiple requests.
- It's important to note that session stores are typically limited in size and have memory constraints. Storing large amounts of data in the session can lead to performance issues or session storage limitations. Therefore, it's recommended to keep session data small and avoid storing sensitive information unless necessary