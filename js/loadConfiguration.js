window.addEventListener('onload', loadConfig());
function loadConfig() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      loadTables(data.spreadsheets);
    })
    .catch(err => {
      console.log(err);
    });
}

function loadTables(tables) { // And Lists within
  tables.forEach(table => {
    addNewTable(table);
    table.lists.forEach(list => {
      addNewList(list);
    })
  });
}
