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

app.patch('/passenger/userName/:id', async (req,res) => { 
    

    try {

    const id = Number(req.params.id);

    const collection = await getCollection();
    const {newFrom , newTo} = req.body;

    const updatedPassenger =  await collection.updateOne( 
        {"PassengerID" : id},
        {
          $set: {
            From: newFrom,
            To: newTo,
          }  
        }
        
    );

    if (!updatedPassenger) {
        return res.status(404).json({message : "User not found to be deleted"});
    }
        res.status(200).json({message: "Ride is successfully updated"});

} catch (error) {
    res.send(500).json({error: "update failed"})
}
     

});


app.delete('/passenger/:id/:Uname', async (req, res) => { 
    try {
    const collection = await getCollection();
    const id = Number(req.params.id);
    const Uname = req.params.Uname;

   
const passengerTobeDeleted = await collection.deleteOne({PassenegrId: id, Name: Uname});



if (passengerTobeDeleted.count === 0 ) { res.status(404).json({message: "user not found"});

}

        res.status(200).json({ message: "Passenger deleted successfully" });
       
    } catch (error) {
        res.status(500).json({ error: "Server error during deletion" });
    }
});





app.listen(port, () => {
   console.log('listining on port' + port)
});


















