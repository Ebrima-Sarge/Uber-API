A simple RESTful API built with Node.js, Express, and MongoDB to manage ride-sharing passengers help users create ride request, update and delete.

To start the server, run:
node riders.js

The server will start on the port defined in the .env file .

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