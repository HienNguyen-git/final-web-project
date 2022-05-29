const connect = require("../config/db");

async function getAllRecharges() {
  /**
   * Lấy tất cả giao dịch nạp tiền
   * Input: None
   * Output: list of giao dịch
   */
  const sql = "SELECT * FROM recharge";

  return new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

module.exports = {
  getAllRecharges,
};
