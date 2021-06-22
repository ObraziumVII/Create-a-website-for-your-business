const router = require('express').Router();

router.get('/requests', (req, res) => {
  res.render('requests');
});

module.exports = router;
