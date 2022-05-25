require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const expressHandlebars = require("express-handlebars");

var authController = require("./controllers/authentication.controller");

var indexRouter = require("./routes/index.route");
var usersRouter = require("./routes/users.route");
var usersDepositRouter = require("./routes/deposit.route");
var usersWithdrawRouter = require("./routes/withdraw.route");
const adminRouter = require("./routes/admin.route");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
    helpers: {
      checkPath(routerPath, navPath, options) {
        const fnTrue = options.fn,
          fnFalse = options.inverse;
        // console.log(routerPath, navPath)
        return routerPath === navPath ? fnTrue(this) : fnFalse(this);
      },
      checkStatus(status, options) {
        const fnTrue = options.fn,
          fnFalse = options.inverse;
        return status == 0 ? fnTrue(this) : fnFalse(this);
      },
    },
  })
);

app.use(require("cookie-parser")("This is code secret code"));
app.use(
  require("express-session")({
    secret: "This is some secret code",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: !true },
  })
);

// Flash message
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.email = req.session.email;
  res.locals.phone = req.session.phone;
  res.locals.total_value = req.session.total_value;
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// authentication
app.use(authController.authenticateUser);
// routing
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/deposit", usersDepositRouter);
app.use("/withdraw", usersWithdrawRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
