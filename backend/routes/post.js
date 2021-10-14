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

/* router.get('/', postCtrl.getAllPosts)
router.get('/:id', postCtrl.getOnePost)
router.post('/', postCtrl.createPost) // rajouter l'AUTH sur toutes les routes
router.put('/:id', postCtrl.modifyPost)
router.delete('/:id', postCtrl.deletePost) */

module.exports = router;