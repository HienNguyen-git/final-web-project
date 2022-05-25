const jwt = require("jsonwebtoken");

const permissionNotNeededRoutes = [
  "GET /",
  "GET /users/login",
  "POST /users/login",
  "GET /users/logout",
];
class AuthenticationController {
  async authenticateUser(req, res, next) {
    const token = req.cookies.accessToken;

    const routeKey = getRouteKey(req);
    const isAuthNotNeededRoute = permissionNotNeededRoutes.includes(routeKey);

    if (token) {
      req.userClaims = jwt.verify(token, process.env.TOKEN_KEY);
      next();
    } else {
      isAuthNotNeededRoute ? next() : res.redirect("/users/login");
    }
  }

  async authenticateFirstUser(req, res, next) {
    /**
     * Giới hạn user đăng nhập lần đầu phải đổi mật khẩu
     */
    let userClaims = req.userClaims;
    const routeKey = getRouteKey(req);

    const permissionNeededRoutes = [
      "GET /users/change-password",
      "POST /users/change-password",
      "GET /users/logout",
    ];

    const isAuthNeededRoute = permissionNeededRoutes.includes(routeKey);

    if (userClaims.status === 0) {
      next();
    } else {
      !isAuthNeededRoute ? res.redirect("/users/change-password") : next();
    }
  }
}

function getRouteKey(req) {
  return `${req.method} ${req._parsedUrl.pathname}`;
}
module.exports = new AuthenticationController();
