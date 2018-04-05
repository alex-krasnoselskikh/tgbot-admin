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
  const spreadsheetIds = [];
  const spreadsheetsNodes = document.querySelectorAll(".spreadsheet-input");
  console.log(spreadsheetsNodes);
  
  //admins
  const adminsNumbers = [];
  const adminsNodes = document.querySelectorAll(".admin-number");
  adminsNodes.forEach(node => {
    adminsNumbers.push(node.value);
  })
  obj.admins = adminsNumbers;

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