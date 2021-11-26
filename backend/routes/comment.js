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
router.get('/:id', auth, commentCtrl.getAllComments);
router.put('/', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
