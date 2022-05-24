const { validationResult } = require("express-validator");
const { createWithdraw } = require("../models/withdraw.model");
const { getCardByAll } = require("../models/credit_card.model");

// GET /withdraw
function renderWithdraw(req, res) {
  res.render("exchange/withdraw", { title: "withdraw" });
}

// POST /withdraw
// todo xử lý logic rút tiền
async function handleWithdraw(req, res) {
  let errors = validationResult(req);
  let error = errors[0];

  if (error) {
    return res.json({
      succes: false,
      message: error.msg,
    });
  }

  let { cardNumber, expireDate, cvv } = req.body;

  // let userData = await getDataFromToken(req);

  // if (!userData) {
  //   return res.json({
  //     succes: false,
  //     message: "Vui lòng đăng nhập để thực hiện việc rút tiền",
  //   });
  // }
  let creditCard = await getCardByAll({ cardNumber, expireDate, cvv });
  if (!creditCard) {
    return res.json({
      succes: false,
      message: "Thẻ không hợp lệ",
    });
  }
}

function getDataFromToken(req) {
  /**
   * Function này sẽ giải mã token và trả về data lấy được từ token
   * Input: Request request
   * Output: data lấy được từ token, null nếu không lấy được
   */
  try {
    let token = req.cookies.accessToken;
    let data = jwt.verify(token, process.env.TOKEN_KEY);

    return data;
  } catch {
    return null;
  }
}

module.exports = { renderWithdraw, handleWithdraw };
