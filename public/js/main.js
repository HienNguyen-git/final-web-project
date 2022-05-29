$(document).ready(() => {
  // * Javascript for GET users/login
  if (document.getElementById("view-account-login")) {
    let form = document.getElementById("form-login");
    form.onsubmit = (e) => {
      e.preventDefault();

      let username = $(`input[name="username"]`).val();
      let password = $(`input[name="password"]`).val();

      let data = {
        username,
        password,
      };

      // Ajax
      $.post("/users/login", data, (response) => {
        // show Message to user
        if (response.success) {
          window.location.href = "/";
        } else {
          alert(response.message);
        }
      });
    };
  }
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
        if (response.success) {
          window.location.href = "/";
        } else {
          alert(response.message);
        }
      });
    };
  }

  // * Javascript for GET users/first-login
  if (document.getElementById("view-account-user-change-pw-first-login")) {
    let form = document.getElementById("acc-change-password");
    form.onsubmit = (e) => {
      e.preventDefault();

      let newPass = $(`input[name="newpass"]`).val();
      let renewPass = $(`input[name="renewpass"]`).val();

      let data = {
        newPass,
        renewPass,
      };

      // Ajax
      $.post("/users/first-login", data, (response) => {
        // show Message to user
        if (response.success) {
          window.location.href = "/";
        } else {
          alert(response.message);
        }
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
        if (response.success) {
          // ? Redirect về đâu
        }
        alert(response.message);
      });
    };
  }

  // * Javascript for GET /admin/withdraw
  if (document.getElementById("view-admin-withdraw")) {
    loadData();
    function loadData() {
      $("#tbody tr").remove();
      $.get("/admin/withdraw/api", (response) => {
        if (response.success) {
          let withdraws = response.data;
          withdraws.forEach((currVal) => {
            renderData(currVal);
          });

          $(".btn.btn-sm").click(onClickButton);
        }
      });
    }
    function renderData(withdraw) {
      /**
       * Render a row of data to table body
       * Input: withdraw Object
       * Output: Data has been append to the table
       */
      let tableBody = $("#tbody");
      let tableContent = `
      <tr>
          <th scope="row">${withdraw.id}</th>
          <td>${withdraw.username}</td>
          <td>${withdraw.card_number}</td>
          <td>${withdraw.value}</td>
          <td>${withdraw.fee}</td>
          <td>${withdraw.date}</td>
          <td>${withdraw.note}</td>
          <td>
            <button class="btn btn-sm btn-success" data-approve="true"  data-id="${withdraw.id}" >
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-sm btn-danger" data-approve="false" data-id="${withdraw.id}">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </td>
        </tr>
      `;

      tableBody.append(tableContent);
    }

    function onClickButton(e) {
      /**
       * Xử lý click event của approve/disapprove
       * Input: e Event
       * Output: lấy dữ liệu và POST lên /admin/withdraw
       */
      let isApproved = this.getAttribute("data-approve");
      let id = this.getAttribute("data-id");

      let data = { id, isApproved };

      $.post("/admin/withdraw", data, (response) => {
        if (response.success) {
          loadData();
        }
        alert(response.message);
      });
    }
  }

  // * Javascript for GET /admin/trans-history
  if (document.getElementById("view-admin-trans-history")) {
    let selectBox = document.getElementById("history-type");

    selectBox.onchange = (e) => {
      let choice = e.target.value;
      loadData(choice);
    };

    function loadData(choice) {
      $("#tbody tr").remove();
      $.get(`/admin/trans-history/${choice}`, (response) => {
        if (response.success) {
          let data = response.data;
          data.forEach((currVal) => {
            renderData(currVal, choice);
          });
        }
      });
    }
    function renderData(data, choice) {
      /**
       * Render a row of data to table body
       * Input: withdraw Object
       * Output: Data has been append to the table
       */
      let tableBody = $("#tbody");
      console.log(choice);
      if (choice === "1") {
        data.status = "Thành công";
      }
      let tableContent = `
      <tr>
          <th scope="row">${data.id}</th>
          <td>${data.username}</td>
          <td>${data.value}</td>
          <td>${data.date}</td>
          <td class="font-weight-bold text-success">${data.status}</td>
          <td>
            <a href="/admin/trans-history/${choice}/${data.id}" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-eye"></i>
            </a>
          </td>
        </tr>
      `;

      tableBody.append(tableContent);
    }

    function onClickButton(e) {
      /**
       * Xử lý click event của approve/disapprove
       * Input: e Event
       * Output: lấy dữ liệu và POST lên /admin/withdraw
       */
      let isApproved = this.getAttribute("data-approve");
      let id = this.getAttribute("data-id");

      let data = { id, isApproved };

      $.post("/admin/withdraw", data, (response) => {
        if (response.success) {
          loadData();
        }
        alert(response.message);
      });
    }
  }
});
