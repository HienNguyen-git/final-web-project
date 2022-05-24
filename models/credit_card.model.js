const connect = require("../config/db");

async function getCardByAll({ cardNumber, expireDate, cvv }) {
  /**
   * Kiểm tra thông tin một thẻ có hợp lệ hay không
   * Input: cardNumber - String, expireDate - Date, cvv - Number
   */

  const sql =
    "SELECT * FROM credit_card WHERE card_number = ? AND expire_date = ? AND cvv = ?";
  const value = [cardNumber, expireDate, cvv];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, async (err, result) => {
      if (err) throw err;
      resolve(result[0]);
    });
  });
}

module.exports = { getCardByAll };
