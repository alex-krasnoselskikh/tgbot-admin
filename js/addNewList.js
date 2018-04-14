function removeList(e) {
  e.target.parentElement.parentElement.parentElement.parentElement
    .removeChild(e.target.parentElement.parentElement.parentElement);
  // console.log('list removed');
}
// DomParser?
function addNewList(list = {}) {
  const { listName, date, status, isSendedColumn, messageText, tgUser } = list;
  const templateList = `
  <div class="list border border-secondary rounded m-2">
    <div class="text-right">
      <button type="button" class="btn btn-danger" onclick="removeList(event)">&#x274C</button>
    </div>
    <div class="form-group row ml-1">
      <label for="listname" class="col-sm-2 col-form-label">List Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="listname" id="listname" value="${listName || ''}">
      </div>
    </div>
    <div class="form-group row ml-1">
      <label for="date" class="col-sm-2 col-form-label">Date</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="date" id="date" value="${date || ''}">
      </div>
    </div>
    <div class="form-group row ml-1">
      <label for="status" class="col-sm-2 col-form-label">Status</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="status" id="status" value="${status || ''}">
      </div>
    </div>
    <div class="form-group row ml-1">
      <label for="is-sended-column" class="col-sm-2 col-form-label">is Sended Column</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="isSendedColumn" id="is-sended-column" value="${isSendedColumn || ''}">
      </div>
    </div>
    <div class="form-group row ml-1">
      <label for="message-text" class="col-sm-2 col-form-label">Message Text</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="messagetext" id="message-text" value="${messageText || ''}">
      </div>
    </div>
    <div class="form-group row ml-1">
      <label for="tg-user" class="col-sm-2 col-form-label">Tg User</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="tguser" id="tguser" value="${tgUser || ''}">
      </div>
    </div>
    <hr />
  </div>
  `;
  // let tmp = document.getElementById('lists-to-add').innerHTML;
  // tmp = templateList + tmp;
  const div = document.createElement("div");
  div.setAttribute("class", "mw-100")
  div.innerHTML = templateList;
  const container = document.getElementById('lists-to-add');
  container.insertBefore(div, container.firstChild);
  // console.log('list added');
}