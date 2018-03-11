const Router = require('koa-router');
const homeController = require('./controllers/home');
const postController = require('./controllers/post');
const commentController = require('./controllers/comment');


const router = new Router();
router.get('/', homeController.welcome);
router.post('/', homeController.welcome);
router.post('/api/posts', postController.write );
router.get('/api/posts', postController.list );
router.get('/api/posts/:id', postController.read);
router.delete('/api/posts/:id', postController.remove);
router.put('/api/posts/:id', postController.replace);
router.patch('/api/posts/:id', postController.update);

router.post('/api/posts/:id/comments', commentController.write);
router.get('/api/posts/:id/comments', commentController.list);
router.delete('/api/posts/:id/comments/:commentId', commentController.delete);

module.exports = router;