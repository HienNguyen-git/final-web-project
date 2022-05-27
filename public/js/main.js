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
});
