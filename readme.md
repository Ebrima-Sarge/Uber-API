The purpose of this API is to have the backend of the an Uber application. I will try to make sure that riders request are being created using the POST method which will send the passengers details such as the name, pickup and endpoint. 

Each user will have a specify ID generated using the date.now method. This will help us identify each passenger.

The unique ID generated  will be used on the end point to request for the passengers details which will be more secure and prevent us from gaing acess to other users info. In this case while using the GET method, we will try to find a users request using the ID on the endpoint instead of the Names or destination. 

The ride request should be updateable by users, pickup and Endpoint making it relaible if users want to chnage their ride destination. 

How TO run this API 
A simple RESTful API built with Node.js, Express, and MongoDB to manage ride-sharing passengers.

1. Create Passenger
URL: POST /passenger
Body: { "Name": "John", "From": "Place A", "To": "Place B" }
Success: 201 Created
2. Get Passenger
URL: GET /passenger/:id
Success: 200 OK
3. Update Passenger
URL: PATCH /passenger/update/:id?uName=John
Body: { "From": "New Place", "To": "New Place" }
Success: 200 OK
4. Delete Passenger
URL: DELETE /passenger/:id?Uname=John
Success: 200 OK

