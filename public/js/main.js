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
          showMessage(response.message, "error");
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
          showMessage(response.message, "error");
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
          showMessage(response.message, "error");
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
          showMessage(response.message);
        } else {
          showMessage(response.message, "error");
        }
      });
    };
  }

  // * Javascript for GET /recharge
  if (document.getElementById("view-exchange-recharge")) {
    let form = document.getElementById("form-recharge");
    form.onsubmit = (e) => {
      e.preventDefault();

      let card_number = $(`input[name="card-number"]`).val();
      let expire_date = $(`input[name="expire-date"]`).val();
      let cvv = $(`input[name="cvv"]`).val();

      let money = $(`input[name="amount"]`).val();

      let data = {
        card_number,
        expire_date,
        cvv,
        money,
      };

      $.post("/recharge", data, (response) => {
        if (response.success) {
          showMessage(response.message);
        } else {
          showMessage(response.message, "error");
        }
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
          showMessage(response.message);
        } else {
          showMessage(response.message, "error");
        }
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

      console.log(data);
      if (choice === "5") {
        data.value = data.price;
      }
      let tableContent = `
      <tr>
          <th scope="row">${data.id}</th>
          <td>${data.username}</td>
          <td>${data.value}</td>
          <td>${data.date}</td>
          ${data.status}
          <td>
            <a href="/admin/trans-history/${choice}/${data.id}" class="btn btn-sm btn-primary">
              <i class="fa-solid fa-eye"></i>
            </a>
          </td>
        </tr>
      `;

      tableBody.append(tableContent);
    }
  }
});

function toast_header({
  title = "",
  message = "",
  type = "info",
  duration = 3000,
}) {
  const main = document.getElementById("custom-toast");
  if (main) {
    const toast = document.createElement("div");

    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    toast.onclick = function (e) {
      if (e.target.closest(".custom-toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("custom-toast", `custom-toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="custom-toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="custom-toast__body">
                        <h3 class="custom-toast__title">${title}</h3>
                        <p class="custom-toast__msg">${message}</p>
                    </div>
                    <div class="custom-toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}

function showMessage(message, type = "success") {
  /**
   *  Dùng để hiển thị toast, có 4 type: success, info, warning, error
   *
   */

  let titles = {
    success: "Thành công!",
    error: "Thất bại!",
    warning: "Cảnh báo!",
    info: "Thông báo",
  };
  toast_header({
    title: titles[type],
    message: message,
    type: type,
    duration: 5000,
  });
}
