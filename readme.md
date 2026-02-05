The purpose of this API is to try to build a similar workflow for a backend of the an Uber application using Rest API, express and mongodb aswell as dotenv to seure some sensitive info/data. I will try to make sure that riderequest are being created using the POST method which will send the passengers details such as the name, pickup location endpoint. 


Each user will have a specify ID generated using the date.now method. This will help us identify each passenger.

The unique ID generated for each passenger will then  be used on the end point to request for the  passengers details which will be more secure and prevent unauthorized acess to other users info. In this case while using the GET method, we will try to find a users request using the ID on the endpoint instead of the Names since users can have similar names. 

This API will also enabke use to update our ride requested that was created. In other to do that we will use the patch method that will allow us update the users pick up and drop points.

Finally i have also implemented the delete method that will allow us to delete passengers ride request from the database aswell. 
