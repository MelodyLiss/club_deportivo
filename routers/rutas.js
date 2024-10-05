
const {Router} = require('express');
const router = Router();
const {findByAllController,findByIdController,insertController,updataController,deleteController} = require('../controllers/deportes.js')


router.get('/',findByAllController);
router.get('/panel', findByAllController);

router.get('/findById',findByIdController);
router.post('/insert',insertController);
router.post('/update',updataController);
router.get('/delete',deleteController);


module.exports = router;
