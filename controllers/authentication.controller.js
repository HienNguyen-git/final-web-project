const jwt = require("jsonwebtoken");

const permissionNotNeededRoutes = [
  "GET /",
  "GET /users/login",
  "POST /users/login",
  "GET /users/register",
  "POST /users/register",
  "GET /users/logout",
];

class AuthenticationController {
  async authenticateUser(req, res, next) {
    const token = req.cookies.accessToken;

    const routeKey = getRouteKey(req);
    const isAuthNotNeededRoute = permissionNotNeededRoutes.includes(routeKey);

    console.log(token);
    if (token) {
      // Đã đăng nhập
      req.userClaims = jwt.verify(token, process.env.TOKEN_KEY);

      // Đăng nhập lần đầu thì chỉ cho vào đổi mật khẩu
      if (req.userClaims.status === -1) {
        let permissionFirstLoginRoutes = [
          "GET /users/change-password",
          "POST /users/change-password",
          "GET /users/logout",
        ];

        const isFirstLoginRoute = permissionFirstLoginRoutes.includes(routeKey);

        isFirstLoginRoute ? next() : res.redirect("/users/change-password");
      } else {
        next();
      }
    } else {
      isAuthNotNeededRoute ? next() : res.redirect("/users/login");
    }
  }
}

function getRouteKey(req) {
  return `${req.method} ${req._parsedUrl.pathname}`;
}
module.exports = new AuthenticationController();
