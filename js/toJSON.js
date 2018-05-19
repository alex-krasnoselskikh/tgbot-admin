function getValue(id) {
  return document.getElementById(id).value;
}
function toJSON() {
  const obj = {};
  obj.Twillo = {
    Sid: getValue('Twillo-sid'),
    Token: getValue('Twillo-token'),
    phoneNumber: getValue('Twillo-phoneNumber'),
  };
  obj.BotApiKey = getValue('botApiKey');
  obj.DbPath = getValue('dbPath');
  obj.GoogleAppName = getValue('googleAppName');
  //spreadsheets  
  
  obj.spreadsheets = getSpreadsheets();

  obj.admins = getAdminsNumbers();

  obj.spreadsheetlog = {
    id: getValue('log-id'),
    messages: getValue('log-messages'),
    errors: getValue('log-errors'),
    auths: getValue('log-auths'),
  }
  
  obj.sendertimeout = getValue('senderTimeout');
  obj.hellomessage = getValue('helloMessage');
  obj.autoresponsetext = getValue('autoresponseText');
  obj.AlreadySubscribedMessage = getValue('alreadySubscribedMessage');
  obj.UserSubscribed = getValue('userSubscribed');
  obj.UserUnsubscribed = getValue('userUnsubscribed');
  obj.UnsupportedMessageType = getValue('unsupportedMessageType');

  fetch(configUrl, {
    method: 'PUT',
    headers: {
      'Authorization': "Bearer " + sessionStorage.getItem(tokenKey),
      'content-type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(response => { 
      if (response.status === 400) {
          alert(`Error invalid list data`)
      } else if (response.status === 204) {
          alert('Success');
      }
    })
    .catch(err => {
      alert('Ошибка')
      console.log(err);
    });
}

//admins
function getAdminsNumbers() {
  const adminsNumbers = [];
  const adminsNodes = document.querySelectorAll(".admin-number");
  adminsNodes.forEach(node => {
    adminsNumbers.push(node.value);
  });
  return adminsNumbers;
}

function getSpreadsheets() {
  const spreadsheets = [];
  //get ids
  const spreadsheetsNodes = document.querySelectorAll(".spreadsheet");
  spreadsheetsNodes.forEach(node => {
    const spreadsheet = {}
    const lists = [];
    const idInput = node.querySelectorAll(".spreadsheet-input");
    spreadsheet.id = idInput[0].value;
    // get lists
    const listNodes = node.querySelectorAll(".list");
    listNodes.forEach(listNode => {
      const list = {};
      const listInputs = listNode.querySelectorAll("input[type=text]");
      listInputs.forEach(input => {
        list[input.name] = input.value;
      });
      lists.push(list);
    });
    spreadsheet.lists = lists;
    spreadsheets.push(spreadsheet);
  });
  return spreadsheets;
}