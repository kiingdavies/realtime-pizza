const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartContorller = require("../app/http/controllers/customers/cartController");

function initRoutes(app) {
  // Get Home Page would render the index function in homeController
  app.get("/", homeController().index);

  // Get Login Page would render the login function in authController
  app.get("/login", authController().login);

  // Get Register Page would render the register function in authController
  app.get("/register", authController().register);

  // Get Cart Page
  app.get("/cart", cartContorller().index);
  app.post('/update-cart', cartContorller().update)
}

module.exports = initRoutes;
