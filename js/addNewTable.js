function removeTable(e) {
  e.target.parentElement.parentElement.parentElement
    .removeChild(e.target.parentElement.parentElement);
}

function addNewTable() {
  // console.log('added');
  const templateTable = `
  <div class="spreadsheet border border-primary" id="spredsheed-434DEFJKLSD3453dgdfgQ_GfmO5tORPMdlOW0">
    <h3>Table 2</h3>
    <div class="col-sm-10">
      <button type="button" class="btn btn-danger" onclick="removeTable(event)">Remove this Table</button>
    </div>
    <div class="form-group row ml-4">
      <label for="speadsheet-id" class="col-sm-2 col-form-label">ID</label>
      <div class="col-sm-10">
        <input type="text" class="form-control spreadsheet-input" name="ID" id="speadsheet-id" value="434DEFJKLSD3453dgdfgQ_GfmO5tORPMdlOW0">
      </div>
    </div>
    <div class="lists">
      <div class="col-sm-10">
        <button type="button" class="btn btn-secondary" onclick="addNewList()">Add New List</button>
      </div>
    <div id="lists-to-add"></div>
    </div>
  </div>
`;
  let tmp = document.getElementById("spreadsheets").innerHTML;
  tmp = templateTable + tmp;
  document.getElementById("spreadsheets").innerHTML = tmp;
}