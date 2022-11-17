// Controllers
const UserController = require('./controllers/UserController');
const LawController = require('./controllers/LawController');
const VoteController = require('./controllers/VoteController');
const TokenController = require('../controllers/TokenController');

// Middleware
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const limitedCall = require('./middlewares/limitedCall');

module.exports = function(app) {
    // User routes
    app.post('/auth/register', UserController.register);
    app.post('/auth/login', UserController.login);
    app.post('/auth/me', AuthMiddleware.isAuth, UserController.me);

    // Law routes
    app.get('/law', [AuthMiddleware.isAuth, limitedCall], LawController.index);
    app.get('/law/:id', [AuthMiddleware.isAuth, limitedCall], LawController.show);
    app.post('/law', AuthMiddleware.isAdmin, LawController.store);
    app.put('/law/:id', AuthMiddleware.isAdmin, LawController.update);
    app.delete('/law/:id', AuthMiddleware.isAdmin, LawController.destroy);

    // Vote routes
    app.get('/vote/:law_id', [AuthMiddleware.isAuth, limitedCall], VoteController.index);
    app.post('/vote/:law_id', [AuthMiddleware.isAuth, limitedCall], VoteController.store);

    // Token routes
    app.get('/token', AuthMiddleware.isAuth, TokenController.index);
    app.put('/token/:token', AuthMiddleware.isAuth, TokenController.refreshToken);
    app.delete('/token/:token', AuthMiddleware.isAuth, TokenController.destroy);

    // Default route
    app.get('*', (req, res) => {
        res.status(404).json({ success: false, message: 'Not Found' });
    });
};