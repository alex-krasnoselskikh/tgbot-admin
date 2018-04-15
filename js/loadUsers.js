function loadUsers() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const buttonsTop = document.createElement("div");
  buttonsTop.setAttribute("id", "buttons-top");

  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");

  const buttonsBottom = document.createElement("div");
  buttonsBottom.setAttribute("id", "buttons-bottom");

  main.appendChild(buttonsTop);
  main.appendChild(grid);
  main.appendChild(buttonsBottom);
  loadInitial();
}

let
  limit = 10,
  currentPage = 1,
  numberOfPagesTotal = 0;

function loadInitial() {
  fetch(`${usersUrl}list?limit=${limit}&offset=0`)
    .then(res => res.json())
    .then(data => {
      drawButtons(data.total);
      drawTable(data.list);
    })
    .catch(err => {
      console.log(err)
    });
}
function loadPage(pageNumber) {
  fetch(`${usersUrl}list?limit=${limit}&offset=${(pageNumber - 1) * limit}`)
    .then(res => res.json())
    .then(data => {
      if (data.list.length === 0 && data.total > 0) {
        loadPage(pageNumber - 1);
        currentPage--;
        drawButtons(data.total);
        changeActivePageButton(currentPage);
        return true;
      }
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'instant' 
       });
      document.getElementById("table").remove();
      drawButtons(data.total);
      drawTable(data.list);
      changeActivePageButton(currentPage);
    })
    .catch(err => {
      console.log(err)
    });
}

function drawPage(e) {
  const pageNumber = Number(e.target.innerHTML);
  currentPage = pageNumber;
  changeActivePageButton(pageNumber);
  loadPage(pageNumber);
}

function drawNextPage() {
  if (currentPage === numberOfPagesTotal) {
    return false;
  }
  currentPage++;
  loadPage(currentPage);
  changeActivePageButton(currentPage);
}

function drawPreviousPage() {
  if (currentPage === 1) {
    return false;
  }
  currentPage--;
  loadPage(currentPage);
  changeActivePageButton(currentPage);
}

function changeActivePageButton(buttonNumber) {
  const lis = [...document.querySelectorAll(".page-item")]
    .forEach(li => li.classList.remove("active"));
  const buttons = [...document.querySelectorAll(".page-link")];
    buttons.filter(button => button.textContent == currentPage)
      .forEach(button => button.parentElement.classList.add("active"));
   // Handle Previous and Next buttons 'disabled' class
  buttons.filter(button => button.textContent === "Previous" || button.textContent === "Next")
    .forEach(button => button.parentElement.classList.remove("disabled"));
  if (currentPage === 1) {
    buttons.filter(button => button.textContent === "Previous")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
  if (currentPage === numberOfPagesTotal || numberOfPagesTotalLogs === 1) {
    buttons.filter(button => button.textContent === "Next")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
}

function drawButtons(total) {
  const quantity = Math.ceil(total / limit);
  numberOfPagesTotal = quantity;
  const buttons = Array.from(new Array(quantity), (val, index) => index + 1);
  const paginationTemplate = `
    <ul class="pagination justify-content-center">
      <li class="page-item button-previous disabled">
        <button class="page-link" type="button" onclick="drawPreviousPage()">Previous</button>
      </li>
      ${buttons.map(button => `
        <li class="page-item ${button === 1 ? 'active' : ''}">
          <button type="button" onclick="drawPage(event)" class="page-link">${button}</button>
        </li>`
      ).join('')}
      <li class="page-item button-next ${quantity === 1 ? 'disabled' : ''}">
        <button class="page-link" type="button" onclick="drawNextPage()">Next</button>
      </li>
    </ul>
  `;
  const div = document.createElement("div");
  div.setAttribute("id", "buttons");
  div.setAttribute("class", "d-flex flex-wrap justify-content-center");
  div.innerHTML = paginationTemplate;
  document.getElementById("buttons-top").innerHTML = "";
  document.getElementById("buttons-bottom").innerHTML = "";

  document.getElementById("buttons-top").appendChild(div);
  const clone = div.cloneNode(true);
  document.getElementById("buttons-bottom").appendChild(clone);
}

function removeUser(userId) {
  fetch(`${usersUrl}${userId}`, {
    method: 'DELETE',
  })
  .then(response => {
     if (response.status === 200
      || response.status === 202
      || response.status === 204) {
       alert('Пользователь удалён');
       loadPage(currentPage);
      }
  })
  .catch(err => {
    alert('Ошибка')
    console.log(err);
    });
}

function drawTable(data) {
  const keys = Object.keys(data[0]);
  const tableTemplate = `
    <table class="table table-striped table-bordered table-sm">
      <thead class="thead-dark">
        <tr>
          ${keys.map(key => `
            <th scope="col" class="text-center">${key}</th>`)
          .join('')}
          <th scope="col" class="text-center">Удалить</th>
        </tr>
      </thead>
      <tbody class="">
      ${data.map(entry => `
        <tr>
          ${keys.map(key => `<td>${entry[key] === null ? "" : entry[key]}</td>`).join('')}
          <td scope="col" class="text-center">
            <button type="button" class="btn btn-danger" onclick="removeUser(${entry.id})">&#x274C</button>
          </td>
        </tr>
      `).join('')}
      </tbody>
    </table>`;
  const div = document.createElement("div");
  div.setAttribute("id", "table");
  div.innerHTML = tableTemplate;
  document.getElementById("grid").appendChild(div);
}
