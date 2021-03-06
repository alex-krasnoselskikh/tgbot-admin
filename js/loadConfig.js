window.addEventListener('onload', loadConfig());
function loadConfig() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log('data');
      // console.log(data);
      loadTwilloValues(data.twillo);
      loadRestValues(data);
      loadAdmins(data.admins);
      loadTables(data.spreadsheets);
      loadLogs(data.spreadsheetLog);
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(config);
}

function loadTwilloValues(config) {
  const keys = Object.keys(config);
  keys.forEach(key => {
    // console.log(document.getElementById(`Twillo-${key}`))
    document.getElementById(`Twillo-${key}`).value = config[key];
  });
}

function loadRestValues(config) {
  const keys = Object.keys(config)
    .filter(key => typeof config[key] !== 'object');
  // console.log(keys)
  keys.forEach(key => {
    document.getElementById(`${key}`).value = config[key];
    // console.log(key)
  });
}

function loadAdmins(admins) {
  admins.forEach(admin => {
    addNewAdmin(admin);
  });
}

function loadLogs(logs) { 
  const keys = Object.keys(logs);
  keys.forEach(key => {
    // console.log(document.getElementById(`Twillo-${key}`))
    document.getElementById(`log-${key}`).value = logs[key];
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