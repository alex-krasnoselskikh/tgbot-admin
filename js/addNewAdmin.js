function addNewAdmin() {
  // <div class="form-group row ml-5">
  //       <input type="text" class="form-control" name="admin-number" value="79194729914">
  //     </div>
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "form-group row ml-5");
  const newInput = document.createElement("input");
  const placeBefore = document.getElementById("admins-to-add");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("class", "form-control")
  newInput.setAttribute("name", "admin-number");
  newDiv.appendChild(newInput);
  placeBefore.insertAdjacentElement('afterend', newDiv);
  console.log('added');
}