function removeList(e) {
  e.target.parentElement.parentElement.parentElement
    .removeChild(e.target.parentElement.parentElement);
  // console.log('list removed');
}

function addNewList() {
  const templateList = `
  <div class="list border border-secondary w-50">
    <div class="col-sm-10">
      <button type="button" class="btn btn-danger" onclick="removeList(event)">Remove this List</button>
    </div>
    <div class="form-group row ml-4">
      <label for="listname" class="col-sm-2 col-form-label">List Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="List Name" id="listname" value="А">
      </div>
    </div>
    <div class="form-group row ml-4">
      <label for="date" class="col-sm-2 col-form-label">Date</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="Date" id="date" value="B">
      </div>
    </div>
    <div class="form-group row ml-4">
      <label for="status" class="col-sm-2 col-form-label">Status</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="Status" id="status" value="AN">
      </div>
    </div>
    <div class="form-group row ml-4">
      <label for="is-sended-column" class="col-sm-2 col-form-label">is Sended Column</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="is Sended Column" id="is-sended-column" value="AO">
      </div>
    </div>
    <div class="form-group row ml-4">
      <label for="message-text" class="col-sm-2 col-form-label">Message Text</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="Message Text" id="message-text" value="AP">
      </div>
    </div>
    <div class="form-group row ml-4">
      <label for="tg-user" class="col-sm-2 col-form-label">Tg User</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="Tg User" id="tg-user" value="AP">
      </div>
    </div>
    <hr />
  </div>
  `;
  let tmp = document.getElementById('lists-to-add').innerHTML;
  tmp = templateList + tmp;
  document.getElementById('lists-to-add').innerHTML = tmp;
  // console.log('list added');
}