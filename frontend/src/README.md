## Ajax
AJAX stands for asynchronous JavaScript and XML. Meaning send asynchronous http request using javascript.
Web application works by sending an HTTP request, receiving an response from the server, and update a web page.
JavaScript allows the user to stay in the same page, while sending and receiving HTTP information. 
Since AJAX request is executed asynchrnously, the response is obtained by calling functions
Coding AJAX in modern website mainly relies on XMLHttpRequest objects:
'''
'use strict';
function success(text) {
	var textarea = document.getElementById('test-response-text');
	textarea.value = text;
}
function fail(code) {
	var textarea = document.getElementById('test-response-text');
	textarea.value = 'Error code: ' + code;
}

var request = new XMLHttpRequest(); // create a new XMLHttpRequest objects

request.onreadystatechange = function() { // the function is recalled when the state changes
	if (request.readyState === 4) { // success
		// determine the response result
		if (request.status === 200) {
			// success, get corresponding text thorugh responseText
			return success(request.responseText);
		} else {
			// failure, determine the reason for failure
			return fail(request.status);
		}
	} else {
		// HTTP request is continued...
	}
}

// send the request:
request.open('GET', '/api/categories');
request.send();

alert('The request is sent, please wait for response');
'''
After creating the XMLHttpRequest object, we need to setup the recall function onreadystatechange. In this recall function, we generaly determine if the request is done by "readyState === 4". If the request is done, use "status === 200" to determine whether the response is success.
The open() function of XMLHttpRequest object has three parameter. The first parameter determine the HTTP request type, ex. "Get" or "POST". The second parameter is URL address. The second parameter is whether using asynchrnous request, with default value "true"

## Safety Restriction
The code above use relative url address. If you change the address into 'http://qq.com.cn/' and run, you will see an error message in the console.
This is because for default, when JavaScript send AJAX request, the URL must be the same as the current page.
There are three ways to request external website URL:
1. Use Flash plugin to request HTTP
2. Set up an proxy server under the current URL, JavaScript will transfer the reqeust to the proxy server
'''
'/proxy?url=http://www.sina.com.cn'
''' 
This is wasteful as the server side need extra operation
3. JSONP, which is restricted to GET request, and the response must be in JavaScript. This method make use of the externel refernce of javascript resource enabled by the browser.
'''
<html>
<head>
    <script src="http://example.com/abc.js"></script>
    ...
</head>
<body>
...
</body>
</html>
'''
JSONP usually recall by calling funciton, for exmaple, 
'''
foo('data');
'''
In this way, if we add an <script> element dynamically in the page, which is equivalent to dynamically request external javascript resource, we can wait for the response.
'''
function refreshPrice(data) {
	var p = document.getElementById('test-jsonp');
	p.innerHTML = 'current price: ' +
	
'''


