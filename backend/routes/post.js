const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

//--------------------------------------------------------------
//--------------  Middlewares
//--------------------------------------------------------------

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//--------------------------------------------------------------
//--------------  CRUD
//--------------------------------------------------------------

router.get('/', auth, postCtrl.getAllPosts)
router.post('/', auth, multer, postCtrl.createPost) // rajouter l'AUTH sur toutes les routes, remettre multer
router.get('/:id', auth, postCtrl.getOnePost)
/* router.put('/:id', postCtrl.modifyPost)
router.delete('/:id', postCtrl.deletePost) */

module.exports = router;