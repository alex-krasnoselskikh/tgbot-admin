window.addEventListener('onload', loadConfigurationForm());
function loadConfig() {
  fetch(configUrl, {
    headers: {
      'Authorization': "Bearer " + sessionStorage.getItem(tokenKey)
    }
  }).then(function(res){ 
      if (res.status === 401) {
        // 401 returned from server
        window.location = 'login.html';
        throw new Error('Unauth!');
       } else {
        return res.json();
       }
    })
    .then(data => {
      loadTables(data.spreadsheets);
      loadTwilloValues(data.twillo);
      loadRestValues(data);
      loadAdmins(data.admins);
      loadLogs(data.spreadsheetLog);
    })
    .catch(err => {
      console.log(err);
    });
}

function loadTwilloValues(config) {
  const keys = Object.keys(config);
  keys.forEach(key => {
    document.getElementById(`Twillo-${key}`).value = config[key];
  });
}

function loadRestValues(config) {
  const keys = Object.keys(config)
    .filter(key => typeof config[key] !== 'object');
  keys.forEach(key => {
    document.getElementById(`${key}`).value = config[key];
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