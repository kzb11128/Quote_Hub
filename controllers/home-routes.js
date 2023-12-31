const router = require('express').Router();
const { User, Quote, UserQuote } = require('../models');
const withAuth = require('../utils/auth');
// Retrieve all quotes from the database
router.get('/', async (req, res) => {
  try {
    const quoteData = await Quote.findAll();
    
    const quotes = quoteData.map((quote) => quote.get({ plain: true }));

    res.render('login', { quotes, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Request to login on homepage
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    
    if (!userData) {
      res.status(400).json({message: 'Invalid email or password, retry!'});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({message: 'Invalid email or password, retry!'});
      return;
    }
    
    req.session.save(() => {
      console.log("check login");
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json("login successful");
      
    });

  } catch (err) {
    console.log("Catch Error");
    res.status(400).json(err);
  }
});

// If the user is already logged in, redirect the request to profile page
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('/');
});

// Redirect to signup page
router.get('/newaccount', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('newaccount');
});

// Profile page should get all user quotes from the database
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userQuoteIdData = await UserQuote.findAll({ 
      where: { 
        user_id: req.session.user_id 
      },
    });

    const userData = await User.findByPk(req.session.user_id);
    
    const userQuoteIds = userQuoteIdData.map((quote) => quote.get({ plain: true }));
    
    console.log(userQuoteIds, 'userQuoteIds');

    const quoteList = userQuoteIds.map(e => e.quote_id);

    console.log(quoteList)
    const quotes = await Quote.findAll({
      where: {
        id: quoteList,
      }
    });

    const userQuotes = quotes.map((quote) => quote.get({ plain: true }));
    

    const user = userData.get({ plain: true });

    res.render('quotes', { user, userQuotes, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
