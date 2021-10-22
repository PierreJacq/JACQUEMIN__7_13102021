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
router.post('/', auth, multer, postCtrl.createPost) 
router.get('/:id', auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, multer, postCtrl.deletePost)

module.exports = router;