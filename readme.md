The purpose of this API is to have the backend of the an Uber application. I will try to make sure that riderequest are being created using the POST method which will send the passengers details such as the name, pickup location endpoint. 

Each user will have a specify ID generated using the date.now method. This will help us identify each passenger.

The unique ID generated  will be used on the end point to request for the passengers details which will be more secure and prevent us from gaing acess to other users info. In this case while using the GET method, we will try to find a users request using the ID on the endpoint instead of the Names or destination. 
