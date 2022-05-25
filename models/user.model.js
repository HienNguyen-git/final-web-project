const connect = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handlePostOTP = (email, otpcode, expired) =>
  new Promise((resolve, reject) => {
    const sql = "insert into otp(email,otpcode,expired) values(?,?,?)";
    const value = [email, otpcode, expired];
    connect.query(sql, value, (err) => {
      if (err) reject(false);
      else {
        resolve(true);
      }
    });
  });

const handleSelectOTP = (email) =>
  new Promise((resolve, reject) => {
    const sql =
      "select * from otp where email = ? order by expired desc limit 1";
    const value = email;
    connect.query(sql, value, (err, result) => {
      if (err) reject(false);
      else {
        resolve(result[0]);
      }
    });
  });

const handleChangePass = (newpass, email) =>
  new Promise((resolve, reject) => {
    const sql = "UPDATE user SET password = ? where username = ?";
    bcrypt.hash(newpass, saltRounds, (err, hash) => {
      const value = [hash, email];
      connect.query(sql, value, (err) => {
        if (err) reject(false);
      });
    });
    resolve(true);
  });

async function updateTotalValue(totalValue, username) {
  /**
   * Cập nhật lại số dư trong tài khoản bằng username
   * Input: total_value - Integer, username - String (Lấy từ accessToken)
   * Output: Value have been updated
   */
  const sql = "UPDATE user_detail SET total_value = ? WHERE username = ?";
  const value = [totalValue, username];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, async (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

async function updateTotalValueByDifference(totalWithdraw, username) {
  /**
   * Cập nhật lại số dư trong tài khoản bằng username
   * Input: total_value - Integer, username - String (Lấy từ accessToken)
   * Output: Value have been updated
   */
  const sql =
    "UPDATE user_detail SET total_value = total_value - ? WHERE username = ?";
  const value = [totalWithdraw, username];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, async (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

async function getUserByUsername(username) {
  /* Lấy account bằng username
    Input: username, String
    Output: found user
    */
  const sql = "SELECT * FROM user WHERE username = ?";
  const value = [username];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, async (err, result) => {
      if (err) throw err;
      resolve(result[0]);
    });
  });
}

async function getUserDetailByUserName(username) {
  /* Lấy account detail bằng username
    Input: username, String
    Output: found user detail
    */
  const sql = "SELECT * FROM user_detail WHERE username = ?";
  const value = [username];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, async (err, result) => {
      if (err) throw err;
      resolve(result[0]);
    });
  });
}

async function updatePasswordById(id, newPass) {
  /**
   * Cập nhật password của một tài khoản bằng id
   * Input: id - String, newPass - String
   * Output: true nếu thành công, false ngược lại
   */
  const sql = "UPDATE user SET password = ? WHERE id = ?";
  const value = [newPass, id];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, (err) => {
      if (err) reject(false);
    });
    resolve(true);
  });
}

module.exports = {
  handlePostOTP,
  handleSelectOTP,
  handleChangePass,
  getUserByUsername,
  getUserDetailByUserName,
  updatePasswordById,
  updateTotalValue,
  updateTotalValueByDifference,
};
