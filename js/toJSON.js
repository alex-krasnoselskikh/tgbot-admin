function getValue(id) {
  return document.getElementById(id).value;
}
function toJSON() {
  const obj = {};
  obj.Twillo = {
    Sid: getValue('sid'),
    Token: getValue('token'),
    phoneNumber: getValue('phone-number'),
  };
  obj.BotApiKey = getValue('bot-api-key');
  obj.DbPath = getValue('db-path');
  obj.GoogleAppName = getValue('google-app-name');
  //spreadsheets
  // const spreadsheets = document.querySelectorAll(".spreadsheets .list");
  // console.log(spreadsheets);
  
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
  obj.hellomessage = getValue('hello-message');
  obj.autoresponsetext = getValue('auto-response-text');
  obj.AlreadySubscribedMessage = getValue('already-subscribed-message');
  obj.UserSubscribed = getValue('user-subscribed');
  obj.UserUnsubscribed = getValue('user-unsubscribed');
  obj.UnsupportedMessageType = getValue('unsupported-message-type');
  console.log (obj);
}