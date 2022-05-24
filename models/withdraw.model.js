async function createWithdraw(withdraw) {
  /* Tạo một giao dịch rút tiền trên bảng withdraw
    Input: withdraw object {username, date, status, fee}
    Output: Đã tạo thành công
    */
  const sql = "INSERT INTO withdraw(username,date,status,fee) values(?,?,?,?)";
  const value = [...Object.keys[withdraw]];

  return new Promise((resolve, reject) => {
    connect.query(sql, value, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

module.exports = { createWithdraw };
