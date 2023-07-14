const router = require('express').Router();
const { User, Quote } = require('../models');
const withAuth = require('../utils/auth');

// Request to login on homepage
router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieve a random quote from the database
router.get('/profile', withAuth, async (req, res) => {
  try {
    const randomQuote = await Quote.findOne({ order: [[Sequelize.literal('RANDOM()')]] });

    res.render('profile', { user: req.session.user_id, quote: randomQuote });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If the user is already logged in, redirect the request to another route
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
