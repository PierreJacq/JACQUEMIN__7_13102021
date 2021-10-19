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

router.get('/', userCtrl.getAllUsers); // attention remettre le middleware AUTH
router.get('/:id', userCtrl.getOneUser); // attention remettre le middleware AUTH
router.put('/:id', userCtrl.modifyOneUser); // attention, remettre le middelware
router.delete('/:id', userCtrl.deleteOneUser); // attention, remmettre le middleware auth

module.exports = router;