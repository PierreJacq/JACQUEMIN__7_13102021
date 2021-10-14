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
/* router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.modifyOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser); */

// Impossible de créer ces routes qui dépendent de ma  faculté à identifier un utilisateur dans ma base

module.exports = router;