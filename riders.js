require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors");




app.use(express.json());
app.use(cors());


const port = process.env.PORT;
const uri = process.env.DATABASE_URL;




const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(uri);

let dbInstance = null;

async function getCollection() {
    if (!dbInstance) {
        await client.connect();
        dbInstance = client.db("riders");
    }
    return dbInstance.collection("passengers");
}


app.post('/passenger', async (req, res) => {
   try{
       const collection = await getCollection();
       
       // *** CHANGE HERE: Match the casing of the JSON body ***
       const { FirstName, LastName, From, To } = req.body; 
       
       // Validation now works because FirstName and LastName will have values
       if (!FirstName || !LastName || !From || !To) {
           return res.status(406).json({
               message: 'passengers details required'
           });
       }

       const newPassenger = {
           FirstName, // Saves as FirstName
           LastName,  // Saves as LastName
           From,
           To,
           Date: new Date(),
           PassengerId: new ObjectId().toString()
       };

       await collection.insertOne(newPassenger)
       res.status(201).json(newPassenger)

   } catch (error) {console.error(error);
       res.status(500).json({error: "Failed to save to database"})
   }
});






app.get('/passenger', async (req, res) => {
    try {
        const collection = await getCollection();
        
        // Find all documents in the collection (passing {} means no filter)
        const passengers = await collection.find({}).toArray();

        if (!passengers || passengers.length === 0) {
            return res.status(404).json({
                message: 'No passengers found in the database'
            });
        }

        // Respond with the array of passenger objects
        res.status(200).json(passengers);

    } catch (error) {
        console.error("Error fetching all passengers:", error);
        res.status(500).json({ error: "Server error while fetching all passengers" });
    }
});





app.get('/passenger/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const id = req.params.id; 

        const passenger = await collection.findOne({ PassengerId: id });

        if (!passenger) {
            return res.status(404).json({
                message: 'Passenger not found'
            });
        } else {

        res.status(200).json(passenger);
        }
    } catch (error) {
          console.error("DATABASE ERROR:", error);
            res.status(500).json({error: "server error"});
        }

});



app.patch('/passenger/update/:id', async (req,res) => { 
    

    try {

    const id = req.params.id;
    const FirstName = req.query.firstName
    const LastName = req.query.LastName
    const { From, To} = req.body;

    const collection = await getCollection();
    

    const result =  await collection.updateOne( 
        {"PassengerId": id, "fName" : FirstName, 'lName' : LastName},
        {
          $set: {
            From: From,
            To: To,
          }  
        }
        
    );
     if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Passenger not found with provided ID and Name" });
        }

        res.status(200).json({ message: "Ride successfully updated", updatedFields: { From, To } });

    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }


});



app.delete('/passenger/:id', async (req, res) => { 
        try {
        const collection = await getCollection();
        const id = req.params.id;
        const FirstName = req.query.FirstName; 
        const LastName = req.query.LastName;// just thought of adding the userName on the params making more secure, so the one deleting will need to know both the the riders name and thier ID. 

    
        const passengerTobeDeleted = await collection.deleteOne({PassengerId: id, FirstName: FirstName, LastName: LastName});



    if (passengerTobeDeleted.deletedCount === 0 ) { res.status(404).json({message: "user not found"});

    }

         res.status(200).json({ message: "You have succesfully deleted the passenger!" });
            
         } catch (error) {
                res.status(500).json({ error: "Server error during deletion" });
        }
});





if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
       console.log('listening on port ' + port)
    });
}

module.exports = app;
















