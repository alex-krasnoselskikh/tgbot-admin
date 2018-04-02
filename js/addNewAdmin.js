function removeAdmin(e) {
  // console.log('removed');
  // console.log(e)
  e.target.parentElement.parentElement.parentElement
    .removeChild(e.target.parentElement.parentElement);
}

{/* <div class="form-group row ml-5 mb-3">
  <div class="input-group-append">
    <input type="text" class="form-control" name="admin-number" value="79194729914">
      <button class="btn btn-outline-danger" type="button" onclick="removeAdmin(event)">X</button>
  </div>
</div> */}

  function addNewAdmin() {
  const outerDiv = document.createElement("div");
  outerDiv.setAttribute("class", "form-group row ml-5 mb-3");

  const innerDiv = document.createElement("div");
  innerDiv.setAttribute("class", "input-group-append");

  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("class", "form-control");
  newInput.setAttribute("name", "admin-number");

  const placeBefore = document.getElementById("admins-to-add");
  
  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-outline-danger");
  button.setAttribute("type", "button");
  button.addEventListener("click", removeAdmin);
  const x = document.createTextNode("X");
  button.appendChild(x);

  innerDiv.appendChild(newInput);
  innerDiv.appendChild(button);
  
  outerDiv.appendChild(innerDiv);
  placeBefore.insertAdjacentElement('afterend', outerDiv);
  // console.log('added');
}