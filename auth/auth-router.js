const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../users/users-model');
const {generateToken} = require('../config/jwt');

function checkString(str){
  return (!str || /^\s*$/.test(str));
}

router.post('/register', (req, res) => {
  const user = req.body;
  if(checkString(user.password) || checkString(user.username)){
    res.status(400).json({message: 'please provide valid args'})
  } else {
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;
    db.add(user).then(saved =>{
      res.status(201).json({username: saved.username});
    })
    .catch(err => {
      res.status(500).json({message: 'Probelm with db', error: err})
    })
  }
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if(checkString(username) || checkString(password)){
    res.status(400).json({message: 'please provide valid args'})
  } else {
    db.findBy({username}).then(([user]) =>{
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({message: 'Welcome!', token})
      } else {
        res.status(401).json({message: 'You Shall not pass!'})
      }
    })
    .catch(err =>{
      res.status(500).json({message: 'Problem with db', error: err})
    })
  }
});

module.exports = router;
