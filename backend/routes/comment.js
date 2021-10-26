const express = require('express');
const router = express.Router();


const commentCtrl = require('../controllers/comment');

//--------------------------------------------------------------
//--------------  Middlewares
//--------------------------------------------------------------

const auth = require('../middleware/auth');

//--------------------------------------------------------------
//--------------  CRUD Créer, afficher, modifier, supprimer
//--------------------------------------------------------------

router.post('/', auth, commentCtrl.createComment);
router.get('/', auth, commentCtrl.getAllComments);
router.put('/', auth, commentCtrl.modifyComment);
router.delete('/', auth, commentCtrl.deleteComment);

module.exports = router;
