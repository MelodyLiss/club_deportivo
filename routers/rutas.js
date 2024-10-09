
const {Router} = require('express');
const router = Router();
const {findByAllController,findByIdController,findByNombreController,insertController,updataController,deleteController,} = require('../controllers/deportes.js')


router.get('/',findByAllController);
router.get('/panel', findByAllController);
router.get('/findById',findByIdController);
router.get('/findByNombre',findByNombreController);
router.post('/insert',insertController);
router.post('/update',updataController);
router.get('/delete',deleteController);


// ruta defaul para paginas no encontradas
router.get('*', (req, res) => {
    res.render('error');});


module.exports = router;
