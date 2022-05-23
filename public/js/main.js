$(document).ready(() => {
  // * Javascript for GET users/change-password
  if (document.getElementById("view-account-changepassword")) {
    let form = document.getElementById("acc-change-password");
    form.onsubmit = (e) => {
      e.preventDefault();

      let currentPass = $(`input[name="currentpass"`).val();
      let newPass = $(`input[name="newpass"`).val();
      let renewPass = $(`input[name="renewpass"`).val();

      let data = {
        currentPass,
        newPass,
        renewPass,
      };

      // Ajax
      $.post("/users/change-password", data, (response) => {
        // show Message to user
        console.log(response);
      });
    };
  }
});
