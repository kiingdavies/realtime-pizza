const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartContorller = require("../app/http/controllers/customers/cartController");
const guest = require('../app/http/middlewares/guest');

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
  app.get("/cart", cartContorller().index);
  // Post Cart Page
  app.post('/update-cart', cartContorller().update)
}

module.exports = initRoutes;
