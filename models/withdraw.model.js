const connect = require("../config/db");

async function getTodayWithdraw() {
  /**
   * Lấy các giao dịch trong ngày (dùng check dk tối đa 2 gdich 1 ngày)
   * Input: None
   * Output: list of giao dịch trong ngày
   */
  const sql = "SELECT * FROM withdraw WHERE DATE(date) = CURDATE()";

  return new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}
async function createWithdraw(withdraw) {
  /* Tạo một giao dịch rút tiền trên bảng withdraw
    Input: withdraw object {username, date, status, fee}
    Output: Đã tạo thành công
    */
  const sql =
    "INSERT INTO withdraw(username,date,value,status,fee) values(?,?,?,?,?)";
  const value = [...Object.values(withdraw)];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

module.exports = { createWithdraw, getTodayWithdraw };
