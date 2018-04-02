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
  button.addEventListener("click", function(e) {
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)
  }); // doesn't work
  const x = document.createTextNode("X");
  button.appendChild(x);

  innerDiv.appendChild(newInput);
  innerDiv.appendChild(button);
  
  outerDiv.appendChild(innerDiv);
  placeBefore.insertAdjacentElement('afterend', outerDiv);
  console.log('added');
}