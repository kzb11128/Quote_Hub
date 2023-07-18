const router = require('express').Router();
const { User, Quote, UserQuote } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new user quote from quotes table
router.post('/', withAuth, async (req, res) => {
  try {
    const { quote_id, user_id } = req.body;

    const userData = await User.findOne({ 
      where: 
      { 
        id: user_id 
      } 
    });

    const quoteData = await Quote.findOne({ 
      where: 
      { 
        id: quote_id 
      } 
    });

    const userQuoteData = await UserQuote.create({
      quote_id, user_id
    });

    res.status(200).json(userQuoteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//render a quote by its id
router.get('/quote/:id', withAuth, async (req, res) => {
  try {
    const quoteData = await Quote.findByPk(req.params.id);

    const quote = quoteData.get({ plain: true });

    res.render('quote', {
      ...quote,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
