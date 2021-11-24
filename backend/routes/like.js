const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

//--------------------------------------------------------------
//--------------  Middlewares
//--------------------------------------------------------------

const auth = require('../middleware/auth');

//--------------------------------------------------------------
//--------------  CRUD
//--------------------------------------------------------------

router.post('/', auth, likeCtrl.addLike);
router.get('/:id', auth, likeCtrl.getPostLikes);
router.delete('/', auth, likeCtrl.deleteLike);

module.exports = router;