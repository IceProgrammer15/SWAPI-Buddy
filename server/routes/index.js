var express = require('express');
var router = express.Router();
var lookupImage = require('../service/imageSE');
var lookupPeople = require('../service/swclient');


router.post('/swinfo', function (req, res) {
    const peopleID = +(req.body && req.body.id);
        
    if(!peopleID){       
        res.status(422);
        const errorObject = {
            error: {
                statusCode: 422,
                name: "ValidationError",
                message: "The `id` is not valid."                
            }
        };
        res.send(errorObject);
    }
    else{
        lookupPeople(peopleID).then(result=>{            
            res.send(result);
        }).catch(err=>{
            res.status(err.response.status);                        
            res.send(err.response.statusText);
        });        
    }        
});


router.post('/img', async function (req, res) {
    const sQuery = (req.body && req.body.q);
    if(!sQuery){        
        res.status(422);
        const errorObject = {
            error: {
                statusCode: 422,
                name: "ValidationError",
                message: "query parameter cannot be empty."
            }
        };
        res.send(errorObject);
    }

    var result = await lookupImage(sQuery);
    res.send({img:result});
});

module.exports = router;