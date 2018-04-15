// window.addEventListener('onload', loadInitialLogs());
function loadLogsTable(logType) {
  if (logType == "history") {
    loadHistory();
    return;
  }
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
  loadInitialLogs();
}

let limitLogs = 10,
  currentPageLogs = 1,
  numberOfPagesTotalLogs = 0;
let logsType = 'auth';

function loadInitialLogs() {
  fetch(`${logsUrl}${logsType}?limit=${limitLogs}&offset=0`)
    .then(res => res.json())
    .then(data => {
      // const firstPageData = data.slice(0, limitLogs);
      drawButtonsLogs(data.total);
      drawTableLogs(data.list);
      console.log('total', data.total);
    })
    .catch(err => {
      console.log(err)
    });
}
function loadPageLogs(pageNumber) {
  fetch(`${logsUrl}${logsType}?limit=${limitLogs}&offset=${(pageNumber - 1) * limitLogs}`)
    .then(res => res.json())
    .then(data => {
      // const offset = (pageNumber - 1) * 10;
      // const pageData = data.slice(offset, offset + limitLogs);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      document.getElementById("table").remove();
      drawTableLogs(data.list);
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
  const lis = [...document.querySelectorAll(".page-item")]
    .forEach(li => li.classList.remove("active"));
  const buttons = [...document.querySelectorAll(".page-link")];
  buttons.filter(button => button.textContent == currentPage)
    .forEach(button => button.parentElement.classList.add("active"));
  if (currentPage === 1) {
    buttons.filter(button => button.textContent === "Previous")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
  // Handle Previous and Next buttons 'disabled' class
  buttons.filter(button => button.textContent === "Previous" || button.textContent === "Next")
    .forEach(button => button.parentElement.classList.remove("disabled"));
  if (currentPage === 1) {
    buttons.filter(button => button.textContent === "Previous")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
  if (currentPageLogs === numberOfPagesTotalLogs) {
    buttons.filter(button => button.textContent === "Next")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
}

function drawButtonsLogs(total) {
  const quantity = Math.ceil(total / limitLogs);
  numberOfPagesTotalLogs = quantity;
  const buttons = Array.from(new Array(quantity), (val, index) => index + 1);
  const paginationTemplate = `
    <ul class="pagination justify-content-center">
      <li class="page-item button-previous disabled">
        <button class="page-link" type="button" onclick="drawPreviousPageLogs()">Previous</button>
      </li>
      ${buttons.map(button => `
        <li class="page-item ${button === 1 ? 'active' : ''}">
          <button type="button" onclick="drawPageLogs(event)" class="page-link">${button}</button>
        </li>`
    ).join('')}
      <li class="page-item button-next">
        <button class="page-link" type="button" onclick="drawNextPageLogs()">Next</button>
      </li>
    </ul>
  `;
  const div = document.createElement("div");
  div.setAttribute("id", "buttons");
  div.setAttribute("class", "d-flex flex-wrap justify-content-center");
  div.innerHTML = paginationTemplate;
  // document.body.appendChild(div);
  document.getElementById("buttons-top").appendChild(div);
  const clone = div.cloneNode(true);
  document.getElementById("buttons-bottom").appendChild(clone);
}

function drawTableLogs(data) {
  const keys = Object.keys(data[0]);
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
  const div = document.createElement("div");
  div.setAttribute("id", "table");
  div.innerHTML = tableTemplate;
  // document.body.appendChild(div);
  document.getElementById("grid").appendChild(div);
}