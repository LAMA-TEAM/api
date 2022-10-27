// Controllers
const UserController = require('./controllers/UserController');
const LawController = require('./controllers/LawController');
const VoteController = require('./controllers/VoteController');

// Middleware
const AuthMiddleware = require('./middlewares/AuthMiddleware');

module.exports = function(app) {
    // User routes
    app.post('/auth/register', UserController.register);
    app.post('/auth/login', UserController.login);
    app.post('/auth/me', AuthMiddleware.isAuth, UserController.me);

    // Law routes
    app.get('/law', LawController.index);

    // Vote routes
    app.get('/vote/:law_id', VoteController.index);

    // Default route
    app.get('*', (req, res) => {
        res.status(404).json({ success: false, message: 'Not Found' });
    });
};