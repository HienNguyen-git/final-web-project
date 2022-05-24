$(document).ready(() => {
  // * Javascript for GET users/change-password
  if (document.getElementById("view-account-user-change-pw")) {
    let form = document.getElementById("acc-change-password");
    form.onsubmit = (e) => {
      e.preventDefault();

      let currentPass = $(`input[name="currentpass"]`).val();
      let newPass = $(`input[name="newpass"]`).val();
      let renewPass = $(`input[name="renewpass"]`).val();

      let data = {
        currentPass,
        newPass,
        renewPass,
      };

      // Ajax
      $.post("/users/change-password", data, (response) => {
        // show Message to user
        alert(response.message);
      });
    };
  }

  // * Javascript for GET /withdraw
  if (document.getElementById("view-exchange-withdraw")) {
    let form = document.getElementById("form-withdraw");
    form.onsubmit = (e) => {
      e.preventDefault();

      let cardNumber = $(`input[name="card-number"]`).val();
      let expireDate = $(`input[name="expire-date"]`).val();
      let cvv = $(`input[name="cvv"]`).val();

      let amount = $(`input[name="amount"]`).val();
      let note = $(`input[name="note"]`).val();

      let data = {
        cardNumber,
        expireDate,
        cvv,
        amount,
        note,
      };

      $.post("/withdraw", data, (response) => {
        console.log(response);
      });
    };
  }
});
