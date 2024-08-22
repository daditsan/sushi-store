const express =  require('express')
const router = express.Router();

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const UserController = require('../controllers/UserController/UserController');
const CategoryController = require('../controllers/CategoryController/CategoryController');
const CuisineController = require('../controllers/CuisineController/CuisineController');

const authentication = require('../middlewares/authentication');
const adminOnly = require('../middlewares/adminOnly');
const { authorization } = require('../middlewares/authorization')
const errorHandler = require('../middlewares/errorHandler');

/* Endpoints */
router.get('/pub/cuisines', CuisineController.pubListCuisines)
router.get('/pub/cuisines/:id', CuisineController.pubGetCuisineById)
router.post('/login', UserController.login)

/* Endpoints below require Authentication */
router.use(authentication)

/* This endpoint is a user with Admin Role only */
router.post('/add-user', adminOnly, UserController.addUser)

/* Cuisines Endpoints */
router.post('/cuisines', CuisineController.createCuisine)
router.get('/cuisines', CuisineController.listCuisines)
router.get('/cuisines/:id', CuisineController.getCuisineById)

/* Cuisines Endpoints below require User's Role Authorization */
router.put('/cuisines/:id', authorization, CuisineController.editCuisineById)
router.patch('/cuisines/:id/img', authorization, upload.single('imgUrl'), CuisineController.replaceImageById)
router.delete('/cuisines/:id', authorization, CuisineController.deleteCuisineById)

/* Categories Endpoints */
router.post('/categories', CategoryController.createCategory)
router.get('/categories', CategoryController.listCategories)
router.put('/categories/:id', CategoryController.editCategoryById)
router.delete('/categories/:id', CategoryController.deleteCategoryById)

router.use(errorHandler)

module.exports = router;