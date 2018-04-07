function getValue(id) {
  return document.getElementById(id).value;
}
function toJSON() {
  const obj = {};
  obj.Twillo = {
    Sid: getValue('Twillo-Sid'),
    Token: getValue('Twillo-Token'),
    phoneNumber: getValue('Twillo-phoneNumber'),
  };
  obj.BotApiKey = getValue('BotApiKey');
  obj.DbPath = getValue('DbPath');
  obj.GoogleAppName = getValue('GoogleAppName');
  //spreadsheets

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
  
  obj.spreadsheets = getSpreadsheets();

  //admins
  function getAdminsNumbers() {
    const adminsNumbers = [];
    const adminsNodes = document.querySelectorAll(".admin-number");
    adminsNodes.forEach(node => {
      adminsNumbers.push(node.value);
    });
    return adminsNumbers;
  }

  obj.admins = getAdminsNumbers();

  obj.spreadsheetlog = {
    id: getValue('log-table-id'),
    messages: getValue('messages'),
    errors: getValue('errors'),
    auths: getValue('auths'),
  }
  obj.sendertimeout = getValue('sendertimeout');
  obj.hellomessage = getValue('hellomessage');
  obj.autoresponsetext = getValue('autoresponsetext');
  obj.AlreadySubscribedMessage = getValue('AlreadySubscribedMessage');
  obj.UserSubscribed = getValue('UserSubscribed');
  obj.UserUnsubscribed = getValue('UserUnsubscribed');
  obj.UnsupportedMessageType = getValue('UnsupportedMessageType');
  console.log(obj);
}