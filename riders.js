require('dotenv').config();

const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');

const port = process.env.PORT;
const uri = process.env.DATABASE_URL;


const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(uri);

async function getCollection() {
   
    await client.connect();
    
    const db = client.db("rides");
    return db.collection("passengers");

}

const passengers = [];


app.post('/passenger', async (req, res) => {

   try{
   const collection = await getCollection();
    const { Name, From, To } = req.body;

    

    if (!Name || !From || !To) {
        return res.status(406).json({
            message: 'passengers details required'
        });
    }

    const newPassenger = {
        Name,
        From,
        To,
        Date: new Date(),
        PassengerId: Date.now()
    };

    await collection.insertOne(newPassenger)
    res.status(202).json(newPassenger)

}catch (error) {console.error(error);
    res.status(523).json({error: "Failed to save to database"})
}
});



app.get('/passenger/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const id = Number(req.params.id); 

        const passenger = await collection.findOne({ PassengerId: id });

        if (!passenger) {
            return res.status(404).json({
                message: 'Passenger not found'
            });
        } else {

        res.status(201).json(passenger);
        }
    } catch (error) {
            res.status(500).json({error: "server error"});
        }

});



app.patch('/passenger/update/:id/:uName', async (req,res) => { 
    

    try {

    const id = Number(req.params.id);
    const uName = req.params.uName

    const collection = await getCollection();
    const {From , To} = req.body;

    const updatedPassenger =  await collection.updateOne( 
        {"PassengerId": id, "Name" : uName},
        {
          $set: {
            From: From,
            To: To,
          }  
        }
        
    );

    if (!updatedPassenger) {
        return res.status(404).json({message : "User not found to be deleted"});
    }
        res.status(200).json({message: "Ride is successfully updated", updatedFields: { From, To }});

} catch (error) {
    res.send(500).json({error: "update failed"})
}
     

});



app.delete('/passenger/:id/:Uname', async (req, res) => { 
        try {
        const collection = await getCollection();
        const id = Number(req.params.id);
        const Uname = req.params.Uname; // just thought of adding the userName on the params making more secure, so the one deleting will need to know both the the riders name and thier ID. 

    
        const passengerTobeDeleted = await collection.deleteOne({PassengerId: id, Name: Uname});



    if (passengerTobeDeleted.count === 0 ) { res.status(404).json({message: "user not found"});

    }

         res.status(200).json({ message: "You have succesfully deleted the passenger!" });
            
         } catch (error) {
                res.status(500).json({ error: "Server error during deletion" });
        }
});





app.listen(port, () => {
   console.log('listining on port' + port)
});


















