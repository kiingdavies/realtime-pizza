const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');

// Middlewares

const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');

function initRoutes(app) {
  // Get Home Page would render the index function in homeController
  app.get("/", homeController().index);

  // Get Login Page would render the login function in authController
  app.get("/login", guest, authController().login);
  // Post Login Page would render the login function in authController
  app.post("/login", authController().postLogin);

  // Get Register Page would render the register function in authController
  app.get("/register", guest, authController().register);
  // Post Register Page would render the register function in authController
  app.post("/register", authController().postRegister);

   // Post Logout Page would render the Logout function in authController
   app.post("/logout", authController().logout);

    // Get Cart Page
    app.get("/cart", cartController().index);
    // Post Cart Page
    app.post('/update-cart', cartController().update);

    // Customer routes
    app.post('/orders', auth, orderController().store);
    app.get('/customers/orders', auth, orderController().index);
    app.get('/customers/orders/:id', auth, orderController().show)

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index);
    app.post('/admin/order/status', admin, statusController().update);
}

module.exports = initRoutes;
