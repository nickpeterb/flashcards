const router = require('express').Router();
let Card = require('../models/card.model.js');

// get all cards
router.route('/').get((req, res) => {
  Card.find()
  .then(cards => res.json(cards))
  .catch(err => res.status(400).json('Error: ' + err));
});

// add a card
router.route('/add').post((req, res) => {
  const side1 = req.body.side1;
  const side2 = req.body.side2;
  const level = req.body.level;
  
  const newCard = new Card({
    side1, side2, level,
  });
  
  newCard.save() 
  .then(() => res.json('Card Added'))
  .catch(err => res.status(400).json('Error: ' + err));
});
 
// get a specific card
router.route('/:id').get((req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete a specific card
router.route('/:id').delete((req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update a specific card
router.route('/update/:id').post((req, res) => {
  Card.findById(req.params.id)
    .then(card => {
      card.side1 = req.body.side1;
      card.side2 = req.body.side2;
      card.level = req.body.level;

      card.save()
        .then(() => res.json('Card updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;