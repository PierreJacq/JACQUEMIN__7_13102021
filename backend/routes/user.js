const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//--------------------------------------------------------------
//--------------  Middlewares
//--------------------------------------------------------------

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//--------------------------------------------------------------
//--------------  Inscription et login
//--------------------------------------------------------------

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);

//--------------------------------------------------------------
//--------------  Reste du CRUD
//--------------------------------------------------------------

/* router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.modifyOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser) */


module.exports = router;