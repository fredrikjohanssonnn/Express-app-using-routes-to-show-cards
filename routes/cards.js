const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  console.log(id);
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { id, text };

  if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

router.get('/', (req, res) => {
  const random = Math.floor(Math.random() * cards.length);

  res.redirect(`/cards/${random}?side=question`);
});

module.exports = router;
