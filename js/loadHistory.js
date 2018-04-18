function loadHistory() { 
  const logsDisplay = document.getElementById("logs-display");
  logsDisplay.innerHTML = `
    <label>Номер телефона</label>
    <input type='text' id='phoneForHistory' value=""></input>
    <input type='button' value='Загрузить' onclick='fetchHistory()'></input>
    <div id='history-table'></div>`;
}

let limitHistory = 20,
currentPageHistory = 1,
numberOfPagesTotalHistory = 0;

function fetchHistory() {
  const phone = document.getElementById('phoneForHistory').value;
  fetch(`${logsUrl}user/${phone}?limit=${limitHistory}&offset=${(currentPageHistory - 1) * limitHistory}`)
  .then(res => res.json())
  .then(data => {
    if (data.total === 0) {
      return false;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    drawHistoryTable(data.list);
    drawButtonsHistory(data.total)
    changeActivePageButtonHistory(currentPageHistory);
  })
  .catch(err => {
    console.log(err)
  });
}

function drawHistoryTable(list) {
  const historyContainer = document.getElementById("history-table");
  historyContainer.innerHTML = "";
  const buttonsTop = document.createElement("div");
  buttonsTop.setAttribute("id", "buttons-top");

  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");

  const buttonsBottom = document.createElement("div");
  buttonsBottom.setAttribute("id", "buttons-bottom");

  historyContainer.appendChild(buttonsTop);
  historyContainer.appendChild(grid);
  historyContainer.appendChild(buttonsBottom);

  const keys = Object.keys(list[0]);
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
      ${list.map(entry => `
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

function drawButtonsHistory(total) {
  const quantity = Math.ceil(total / limitHistory);
  numberOfPagesTotalHistory = quantity;
  // const buttons = Array.from(new Array(quantity), (val, index) => index + 1);
  const buttons = simplePagination(currentPageLogs, quantity);
  const paginationTemplate = `
    <ul class="pagination justify-content-center">
      <li class="page-item button-previous disabled">
        <button class="page-link" type="button" onclick="drawPreviousPageHistory()">Previous</button>
      </li>
      ${buttons.map(button => `
        <li class="page-item ${button === 1 ? 'active' : ''} ${button === '...' ? ' disabled' : ''}">
          <button type="button" onclick="drawPageHistory(event)" class="page-link">${button}</button>
        </li>`
    ).join('')}
      <li class="page-item button-next ${quantity === 1 ? 'disabled' : ''}">
        <button class="page-link" type="button" onclick="drawNextPageHistory()">Next</button>
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

function drawPageHistory(e) {
  const pageNumber = Number(e.target.innerHTML);
  currentPageHistory = pageNumber;
  changeActivePageButtonHistory(pageNumber);
  fetchHistory(pageNumber);
}

function drawNextPageHistory() {
  if (currentPageHistory === numberOfPagesTotalHistory) {
    return false;
  }
  currentPageHistory++;
  fetchHistory(currentPageHistory);
  changeActivePageButtonHistory(currentPageHistory);
}

function drawPreviousPageHistory() {
  if (currentPageHistory === 1) {
    return false;
  }
  currentPageHistory--;
  fetchHistory(currentPageHistory);
  changeActivePageButtonHistory(currentPageHistory);
}

function changeActivePageButtonHistory(buttonNumber) {
  const lis = [...document.querySelectorAll(".page-item")]
    .forEach(li => li.classList.remove("active"));
  const buttons = [...document.querySelectorAll(".page-link")];
  buttons.filter(button => button.textContent == currentPageHistory)
    .forEach(button => button.parentElement.classList.add("active"));
  // Handle Previous and Next buttons 'disabled' class
  buttons.filter(button => button.textContent === "Previous" || button.textContent === "Next")
    .forEach(button => button.parentElement.classList.remove("disabled"));
  if (currentPageHistory === 1) {
    buttons.filter(button => button.textContent === "Previous")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
  if (currentPageHistory === numberOfPagesTotalHistory) {
    buttons.filter(button => button.textContent === "Next")
      .forEach(button => button.parentElement.classList.add("disabled"));
  }
}