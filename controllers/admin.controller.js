const jwt = require("jsonwebtoken");

const {
  formatDateTime,
  dataProcess,
  formatDate,
  encodeStatusCode,
  formatDateTime2,
} = require("../config/helper");
const {
  getUserAccountByStatus,
  getUserDetailByUsername,
  updateUserStatus,
  handleSelectDepositMore5m,
  updateStatusToCheck,
} = require("../models/admin.model");
const {
  handleUpdateTotalValueOfSender,
  handleUpdateTotalValueOfReceiver,
} = require("../models/deposit.model");
const { updateTotalValueByDifference, updateAbnormal } = require("../models/user.model");
const {
  getWithdrawAdmin,
  updateStatusById,
  getWithdrawById,
} = require("../models/withdraw.model");
const {
  getTranSHistoryByUsername,
} = require("../models/trans-history.model");
const getAdminHome = (req, res) => {
  res.render("admin/home", { title: "Admin", isAdmin: true, routerPath: "" });
};

const handleAdminUserAccount = async (req, res) => {
  const username = req.query["username"];
  console.log(username)
  if (username === undefined) {
    const raw = await getUserAccountByStatus(0);
    const data = raw.map((e) => ({
      id: e.id,
      username: e.username,
      status: e.status,
      last_modified: formatDateTime(e.last_modified),
    }));

    return res.render("admin/account", {
      title: "Account",
      isAdmin: true,
      data,
      routerPath: "admin/account",
    });
  } else {
    const raw = await getUserDetailByUsername(username);
    console.log(raw)
    const data = raw.map((e) => ({
      id: e.id,
      username: e.username,
      status: e.abnormal == 2 ? encodeStatusCode(4) : encodeStatusCode(e.status),
      statusCode: e.abnormal == 2 ? 4:e.status,
      login_attempts: e.login_attempts,
      phone: e.phone,
      email: e.email,
      name: e.name,
      date_of_birth: formatDate(e.date_of_birth),
      address: e.address,
      front_cmnd: e.front_cmnd,
      back_cmnd: e.back_cmnd,
      total_value: e.total_value,
    }));
    console.log(data);
    return res.render("admin/account-info", {
      title: "Account",
      isAdmin: true,
      data,
    });
  }
};

const handleAccountApi = async (req, res) => {
  const statusArr = [0, 1, 2, 3, 4];
  let status = req.query["status"];
  if (status === undefined) {
    status = 0;
  }
  if (!statusArr.includes(+status)) {
    return res.json({
      code: 1,
      message: "Status not valid!",
    });
  } else {
    if(status==4){
      const raw = await getUserAccountByStatus(status);
      const data = raw.map((e) => ({
        id: e.id,
        username: e.username,
        status: e.status,
        last_modified: formatDateTime(e.last_modified),
      }));
    }else{
      const raw = await getUserAccountByStatus(status);
      const data = raw.map((e) => ({
        id: e.id,
        username: e.username,
        status: e.status,
        last_modified: formatDateTime(e.last_modified),
      }));
    }
    res.json({
      code: 0,
      message: "Get data successful!",
      data,
    });
  }
};

const handleAccountStatus = async (req, res) => {
  const { username, action } = req.body;

  if (username === undefined || action === undefined) {
    return res.json({
      code: 1,
      message: "Missing input value!",
    });
  } else {
    try {
      const actions = ["verify", "cancel", "request", "unclock"];
      const actionIndex = actions.indexOf(action) + 1;
      const currentDateTime = formatDateTime2();
      if (actionIndex == 4) {
        if (await updateAbnormal(username, 0)) {
          return res.json({
            code: 0,
            message: `Update username=${username} successful!`,
          });
        }
      } else {
        if (await updateUserStatus(username, actionIndex, currentDateTime)) {
          return res.json({
            code: 0,
            message: `Update username=${username} successful!`,
          });
        } else {
          res.json({
            code: 1,
            message: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};

const getDepositMore5m = async (req, res) => {
  const raw = await handleSelectDepositMore5m(0);
  const data = raw.map((e) => ({
    id: e.id,
    phone_sender: e.phone_sender,
    phone_receiver: e.phone_receiver,
    value: e.value,
    fee: e.fee,
    feeperson: e.feeperson,
    note: e.note,
    status: e.status === 0 ? false : true,
    date: formatDateTime(e.date),
  }));
  // console.log(data);
  res.render("admin/deposit", {
    title: "Deposit",
    isAdmin: true,
    routerPath: "admin/deposit",
    data,
  });
};

const getWithdrawMore5m = async (req, res) => {
  const raw = await handleSelectDepositMore5m(0);
  const data = raw.map((e) => ({
    id: e.id,
    phone_sender: e.phone_sender,
    phone_receiver: e.phone_receiver,
    value: e.value,
    fee: e.fee,
    feeperson: e.feeperson,
    note: e.note,
    status: e.status === 0 ? false : true,
    date: formatDateTime(e.date),
  }));
  // console.log(data);
  res.render("admin/withdraw", {
    title: "Deposit",
    isAdmin: true,
    routerPath: "admin/withdraw",
    data,
  });
};

const getTransHistory = async (req, res) => {
  const username = req.query["username"];
  if (username === undefined) {
    const raw = await getUserAccountByStatus(0);
    const data = raw.map((e) => ({
      id: e.id,
      username: e.username,
      status: e.status,
      last_modified: formatDateTime(e.last_modified),
    }));

    return res.render("admin/trans-history", {
      title: "Transaction History",
      isAdmin: true,
      data,
      routerPath: "admin/trans-history",
    });
  } else {
    const raw = await getTranSHistoryByUsername(username);
    const data = raw.map((e) => ({
      id: e.id,
      phone: e.phone,
      name: e.name,
      date: e.date,
      value: e.value,
      note: e.note,
      fee: e.fee,
      total_value: e.total_value,
    }));
    console.log(data);
    return res.render("admin/trans-history-detail", {
      title: "Transaction History",
      isAdmin: true,
      data,
    });
  }
};

const apiGetWithdrawMore5m = async (req, res) => {
  /**
   * Api dùng để lấy withdraw cần duyệt của admin
   */
  let withdraws = await getWithdrawAdmin();

  return res.json({
    success: true,
    message: "Lấy withdraws cần duyệt thành công",
    data: withdraws,
  });
};

// todo /POST /admin/withdraw
const postWithdrawMore5m = async (req, res) => {
  /**
   * Duyệt hay từ chối giao dịch của user
   */

  let userData = getDataFromToken(req);

  if (!userData) {
    return res.json({
      success: false,
      message: "Phải đăng nhập để sử dụng chức năng này",
    });
  }

  if (userData.username !== "admin") {
    return res.json({
      success: false,
      message: "Phải là admin để sử dụng chức năng này",
    });
  }
  let { id, isApproved } = req.body;

  let withdraw = await getWithdrawById(id);

  if (!withdraw) {
    return res.json({
      success: false,
      message: "Không có giao dịch rút tiền này trong hệ thống",
    });
  }

  let { username, value, fee } = withdraw;
  let totalWithdraw = parseInt(value) + parseInt(fee);

  if (isApproved === "true") {
    // Duyệt giao dịch rút tiền, cập nhật lại số dư
    await updateStatusById(id, 2);
    await updateTotalValueByDifference(totalWithdraw, username);

    return res.json({
      success: true,
      message: "Duyệt giao dịch thành công",
    });
  } else {
    // Không duyệt giao dịch rút tiền
    await updateStatusById(id, -1);

    return res.json({
      success: true,
      message: "Từ chối giao dịch thành công",
    });
  }
};

const postDepositMore5m = async (req, res) => {
  let { id, phone_sender, phone_receiver, value, fee, feeperson } = req.body;
  //console.log(id,phone_sender,phone_receiver,value,fee,feeperson)
  try {
    let moneyDepositFeeReceiver = value;
    if (feeperson == "receiver") {
      moneyDepositFeeReceiver = value - fee;
      // console.log(moneyDepositFeeReceiver)
    } else {
      value = +value + +fee;
    }
    await handleUpdateTotalValueOfSender(value, phone_sender);
    await handleUpdateTotalValueOfReceiver(
      moneyDepositFeeReceiver,
      phone_receiver
    );
    await updateStatusToCheck(1, +id);
    return res.json({
      code: 0,
      message: `Update status successful!`,
    });
  } catch (error) {
    console.log(error);
  }
};

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
module.exports = {
  getAdminHome,
  handleAdminUserAccount,
  handleAccountApi,
  handleAccountStatus,
  getDepositMore5m,
  postDepositMore5m,
  getWithdrawMore5m,
  postWithdrawMore5m,
  apiGetWithdrawMore5m,
  getTransHistory,
};
