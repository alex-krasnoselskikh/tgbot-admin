function loadLogsTable(logType = 'auth') {
  if (logType == "history") {
    loadHistory();
    return;
  }
  document.getElementById("how-many-logs-display").setAttribute("onChange", "changeLimitLogs(this.value)");
  const logsDisplay = document.getElementById("logs-display");
  logsDisplay.innerHTML = "";

  const buttonsTop = document.createElement("div");
  buttonsTop.setAttribute("id", "buttons-top");

  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");

  const buttonsBottom = document.createElement("div");
  buttonsBottom.setAttribute("id", "buttons-bottom");

  logsDisplay.appendChild(buttonsTop);
  logsDisplay.appendChild(grid);
  logsDisplay.appendChild(buttonsBottom);
  logsType = logType;
  currentPageLogs = 1;
  loadPageLogs();
}

let limitLogs = 20,
  currentPageLogs = 1,
  numberOfPagesTotalLogs = 0;
let logsType = 'auth';

function changeLimitLogs(newLimitLogs) {
  if (newLimitLogs === 'Все') {
    fetch(`${logsUrl}${logsType}?limit=1&offset=0`, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem(tokenKey)
      }
    }).then(function(res){ 
        if (res.status === 401) {
          // 401 returned from server
          window.location = 'login.html';
          throw new Error('Unauth!');
         } else {
          return res.json();
         }
      })
      .then(data => {
        limitLogs = data.total;
        currentPageLogs = 1;
        loadPageLogs();
        drawButtonsLogs();
        return true;
      })
      .catch(err => console.log(err));
    return;
  }
  limitLogs = Number(newLimitLogs);
  currentPageLogs = 1;
  loadPageLogs();
  drawButtonsLogs();
}

function loadPageLogs(pageNumber = 1) {
  fetch(`${logsUrl}${logsType}?limit=${limitLogs}&offset=${(pageNumber - 1) * limitLogs}`, {
    headers: {
      'Authorization': "Bearer " + sessionStorage.getItem(tokenKey)
    }
  }).then(function(res){ 
      if (res.status === 401) {
        // 401 returned from server
        window.location = 'login.html';
        throw new Error('Unauth!');
       } else {
        return res.json();
       }
    })
    .then(data => {
      // if (data.total === 0) {
      //   return false;
      // }
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      drawButtonsLogs(data.total);
      drawTableLogs(data.list);
      changeActivePageButtonLogs(currentPageLogs);
    })
    .catch(err => {
      console.log(err)
    });
}

function drawPageLogs(e) {
  const pageNumber = Number(e.target.innerHTML);
  currentPageLogs = pageNumber;
  changeActivePageButtonLogs(pageNumber);
  loadPageLogs(pageNumber);
}

function drawNextPageLogs() {
  if (currentPageLogs === numberOfPagesTotalLogs) {
    return false;
  }
  currentPageLogs++;
  loadPageLogs(currentPageLogs);
  changeActivePageButtonLogs(currentPageLogs);
}

function drawPreviousPageLogs() {
  if (currentPageLogs === 1) {
    return false;
  }
  currentPageLogs--;
  loadPageLogs(currentPageLogs);
  changeActivePageButtonLogs(currentPageLogs);
}

function changeActivePageButtonLogs(buttonNumber) {
  const lis = [...document.querySelectorAll(".page-item")];
  lis.forEach(li => li.classList.remove("active"));

  const buttons = [...document.querySelectorAll(".page-link")];
  buttons.filter(button => button.textContent == currentPageLogs)
    .forEach(button => button.parentElement.classList.add("active"));
  // Handle Previous and Next buttons 'disabled' class
  buttons.filter(button => button.textContent === "Previous" || button.textContent === "Next")
    .forEach(button => button.parentElement.classList.remove("disabled"));
  if (currentPageLogs === 1) {
    buttons.filter(button => button.textContent === "Previous")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
  if (currentPageLogs === numberOfPagesTotalLogs || numberOfPagesTotalLogs === 1) {
    buttons.filter(button => button.textContent === "Next")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
}

function drawButtonsLogs(total) {
  const quantity = Math.ceil(total / limitLogs);
  numberOfPagesTotalLogs = quantity;
  // const buttons = Array.from(new Array(quantity), (val, index) => index + 1);
  const buttons = simplePagination(currentPageLogs, quantity);
  const paginationTemplate = `
    <ul class="pagination justify-content-center">
      <div class="d-flex flex-wrap">
        <li class="page-item button-previous disabled">
          <button class="page-link" type="button" onclick="drawPreviousPageLogs()">Previous</button>
        </li>
        ${buttons.map(button => `
          <li class="page-item ${button === 1 ? ' active' : ''} ${button === '...' ? ' disabled' : ''}">
            <button type="button" onclick="drawPageLogs(event)" class="page-link">${button}</button>
          </li>`
        ).join('')}
        <li class="page-item button-next ${quantity === 1 ? 'disabled' : ''}">
          <button class="page-link" type="button" onclick="drawNextPageLogs()">Next</button>
        </li>
      </div>
    </ul>
  `;
  const div = document.createElement("div");
  div.setAttribute("id", "buttons");
  // div.setAttribute("class", "d-flex flex-wrap justify-content-center");
  div.innerHTML = paginationTemplate;
  document.getElementById("buttons-top").innerHTML = "";
  document.getElementById("buttons-bottom").innerHTML = "";

  document.getElementById("buttons-top").appendChild(div);
  const clone = div.cloneNode(true);
  document.getElementById("buttons-bottom").appendChild(clone);
}

function drawTableLogs(data) {
  if (data.length === 0) {
    document.getElementById("grid").innerHTML = `<h4 class="text-danger text-center">Нет данных</h4>`;
    document.getElementById("buttons-top").innerHTML = "";
    document.getElementById("buttons-bottom").innerHTML= "";
    return;
  }
  const keys = Object.keys(data[0] || 0);
  const tableTemplate = `
    <table class="table table-striped table-bordered table-sm">
      <thead class="thead-dark">
        <tr>
          ${keys.map(key => `
            <th scope="col" class="text-center">${key}</th>`)
      .join('')}
        </tr>
      </thead>
      <tbody class="">
      ${data.map(entry => `
        <tr>
          ${keys.map(key => `<td>${entry[key] === null ? "" : entry[key]}</td>`).join('')}
        </tr>
      `).join('')}
      </tbody>
    </table>`;
  document.getElementById("grid").innerHTML = "";
  const div = document.createElement("div");
  div.setAttribute("id", "table");
  div.innerHTML = tableTemplate;
  document.getElementById("grid").appendChild(div);
}