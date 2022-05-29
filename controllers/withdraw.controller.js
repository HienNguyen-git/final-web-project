const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const {
  createWithdraw,
  getTodayWithdraw,
  getWithdrawAdmin,
} = require("../models/withdraw.model");
const { getCardByAll } = require("../models/credit_card.model");
const {
  getUserByUsername,
  getUserDetailByUserName,
  updateTotalValue,
  updateTotalValueByDifference,
} = require("../models/user.model");

// GET /withdraw
function renderWithdraw(req, res) {
  res.render("exchange/withdraw", { title: "withdraw" });
}

// POST /withdraw
// todo xử lý logic rút tiền
async function handleWithdraw(req, res) {
  let errors = validationResult(req).errors;
  let error = errors[0];

  console.log(error);
  if (error) {
    return res.json({
      succes: false,
      message: error.msg,
    });
  }

  let { cardNumber, expireDate, cvv, amount, note } = req.body;

  let userData = await getDataFromToken(req);

  if (!userData) {
    return res.json({
      succes: false,
      message: "Vui lòng đăng nhập để thực hiện việc rút tiền",
    });
  }

  // * Credit card exist validation
  let creditCard = await getCardByAll({ cardNumber, expireDate, cvv });

  if (!creditCard) {
    return res.json({
      succes: false,
      message: "Thẻ không hợp lệ",
    });
  }

  // * Multiplicity of 50000 validation
  if (amount % 50000 !== 0) {
    return res.json({
      succes: false,
      message: "Số tiền phải là bội số của 50,000 đồng!",
    });
  }

  // * Maximum 2 transactions a day validation
  const result = await getTodayWithdraw();

  if (result.length >= 2) {
    return res.json({
      succes: false,
      message: "Một ngày chỉ được tạo tối đa 2 giao dịch rút tiền!",
    });
  }

  let fee = amount * 0.05;
  let totalWithdraw = parseInt(amount) + parseInt(fee);

  let currentUserDetail = await getUserDetailByUserName(userData.username);
  let total = currentUserDetail["total_value"];

  if (total < totalWithdraw) {
    return res.json({
      succes: false,
      message: "Số dư hiện tại không đủ!",
    });
  }

  // Main
  let status = total > 5000000 ? 0 : 1;
  let withdraw = {
    username: userData.username,
    date: new Date(Date.now()),
    value: parseInt(amount),
    status: status,
    fee: parseInt(fee),
    note: note,
  };

  await createWithdraw(withdraw);
  if (status) {
    // Thành công
    await updateTotalValueByDifference(totalWithdraw, userData.username);

    return res.json({
      success: true,
      message: "Tiền đã được rút về thẻ thành công",
    });
  } else {
    // Chờ duyệt
    return res.json({
      success: true,
      message: "Số tiền vượt quá 5tr sẽ phải chờ admin duyệt",
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

const getWithdrawByUser = async(req,res)=>{
  console.log("Receive")
  const userData = req.userClaims
  console.log(userData)
  res.json({
    code: 0,
    data: userData
  })
}

module.exports = { 
  renderWithdraw, 
  handleWithdraw,
  getWithdrawByUser
};
