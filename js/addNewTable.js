// window.addEventListener('input', function (e) {
//   console.log("input event detected! coming from this element:", e.target.value);
//   e.target.attributes.value = e.target.value;
//   console.log(e.target.attributes.value);
//  }, false);

function removeTable(e) {
  e.target.parentElement.parentElement.parentElement.parentElement
    .removeChild(e.target.parentElement.parentElement.parentElement);
}

function addNewTable(table = {}) {
  // console.log(table.lists);
  const templateTable = `
  <div class="spreadsheet border border-primary" id="spreadsheet-${table.id || 'iam new'}">
    <h3>New Table</h3>
    <div class="col-sm-10">
      <button type="button" class="btn btn-danger" onclick="removeTable(event)">Удалить эту таблицу</button>
    </div>
    <div class="form-group row ml-4">
      <label for="speadsheet-id" class="col-sm-2 col-form-label">ID</label>
      <div class="col-sm-10">
        <input type="text" class="form-control spreadsheet-input" name="id" id="speadsheet-id" value="${table.id || ''}">
      </div>
    </div>
    <div class="lists">
      <div class="col-sm-10">
        <button type="button" class="btn btn-secondary" onclick="addNewList()">Добавить новый лист</button>
      </div>
    <div id="lists-to-add" class="d-flex flex-wrap w-100"></div>
    </div>
  </div>
`;
  // let tmp = document.getElementById("spreadsheets").innerHTML;
  // tmp = templateTable + tmp;
  // document.getElementById("spreadsheets").innerHTML = tmp;
  const div = document.createElement("div");
  div.innerHTML = templateTable;
  const container = document.getElementById('spreadsheets-to-add');
  container.insertBefore(div, container.firstChild);
}