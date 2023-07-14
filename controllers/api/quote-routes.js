const router = require('express').Router();
const { Quote } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const quoteData = await Quote.findAll();
    res.status(200).json(quoteData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  try {
    const quoteData = await Quote.findByPk(req.params.id);
    if (!quoteData){
      res.status(404).json({message: 'No quote found with this id!'});
      return;
    }

    res.status(200).json(quoteData);
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;
