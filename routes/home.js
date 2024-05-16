const express=require('express');
const router=express.Router();
const Player=require('../models/Player');


// router.get('/',(req,res,next) => {
//     res.send('home');
// })

router.get('/', (req, res) => {
    Player.find()
        .then(players => {
            res.render('home', { players: players });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching players');
        });
});

router.post('/add', (req, res) => {
    const name = req.body.name;
    const info = req.body.info;
    const team = req.body.team;
    
    let player = new Player({
        name: name,
        info: info,
        team: team
    });
    
    console.log(player);
    
    player.save()
        .then(() => {
            console.error("success");
            res.redirect('/home');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});
router.get("/edit/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const doc = await Player.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (doc) {
            res.render('edit' ,{player:doc});
        } else {
            console.error("Error in updating player");
            res.status(500).send('Error in updating player');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in updating player');
    }
});
router.post('/edit/:id', (req, res) => {
    console.log(req.params.id);
    Player.findOneAndUpdate({ _id: req
        .params
        .id}, req.body, { new: true })

        .then(player => {
            res.redirect('/home');
        }
        )
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating player');
        });
}
);

router.get('/delete/:id', (req, res) => {
    Player.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/home');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting player');
        });
});



    // Player.findById(req.params.id)
    // .then(player => {
    //     res.render('edit',{player:player});
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.status(500).send('Error fetching player');
    // });

module.exports=router;