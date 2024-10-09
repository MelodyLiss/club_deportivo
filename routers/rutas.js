
const {Router} = require('express');
const router = Router();
const {findByAllController,findByIdController,insertController,updataController,deleteController,preupdataController} = require('../controllers/deportes.js')


router.get('/',findByAllController);
router.get('/panel', findByAllController);
router.get('/findById',findByIdController);
router.post('/insert',insertController);
router.post('/update',updataController);
router.get('/delete',deleteController);


// ruta defaul para paginas no encontradas
router.get('*', (req, res) => {
    res.render('error');});


module.exports = router;
