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