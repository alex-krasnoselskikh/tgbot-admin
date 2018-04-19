function loadConfigurationForm() {
  const templateConfigurationForm = `
  <h3>TECT</h3>
  <div class="tab">
      <button class="tablinks" id="tabDefaultOpen" onclick="switchTab(event, 'config-sources')">Источники</button>
      <button class="tablinks" onclick="switchTab(event, 'config-autoanswer')">Автоответ</button>
      <button class="tablinks" onclick="switchTab(event, 'config-system')">Системные настройки</button>
      <button class="tablinks" onclick="switchTab(event, 'config-admins')">Администраторы</button>
      <button class="tablinks" onclick="switchTab(event, 'config-spreadsheetlog')">Логи таблиц</button>
    </div>

    <div id="config-sources" class="tabcontent active">
      <h3>Google-Таблицы</h3>
      <div class="col-sm-10">
        <button type="button" class="btn btn-primary" onclick="addNewTable()">Добавить новую таблицу</button>
      </div>
      <div id="spreadsheets-to-add">
        <!--- New tables goes here -->
      </div>
    </div>

    <div id="config-autoanswer" class="tabcontent">
      <h3 class="mb-3">Настройки автоответов</h3>
      <div class="form-group row ml-4">
        <label for="hellomessage" class="col-sm-2 col-form-label">Приветственное сообщение (Hello Message)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="Hello Message" id="helloMessage">
        </div>
      </div>
      <div class="form-group row ml-4">
        <label for="autoresponsetext" class="col-sm-2 col-form-label">Автоответ (Auto Responce)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="autoresponsetext" id="autoresponseText">
        </div>
      </div>
      <div class="form-group row ml-4">
        <label for="alreadySubscribedMessage" class="col-sm-2 col-form-label">Пользователь уже подписан (AlreadySubscribedMessage)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="alreadySubscribedMessage" id="alreadySubscribedMessage">
        </div>
      </div>
      <div class="form-group row ml-4">
        <label for="userSubscribed" class="col-sm-2 col-form-label">Пользователь подписался (UserSubscribed)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="userSubscribed" id="userSubscribed">
        </div>
      </div>
      <div class="form-group row ml-4">
        <label for="userUnsubscribed" class="col-sm-2 col-form-label">Пользователь отписался (UserUnsubscribed)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="userUnsubscribed" id="userUnsubscribed">
        </div>
      </div>
      <div class="form-group row ml-4">
        <label for="unsupportedMessageType" class="col-sm-2 col-form-label">Сообщение неподдерживаемого типа (UnsupportedMessageType)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="unsupportedMessageType" id="unsupportedMessageType">
        </div>
      </div>
      <hr />
    </div>

    <div id="config-system" class="tabcontent">
      <h3 class="mb-3">Системные настройки</h3>
      <div class="twillo">
        <h3>Twilio</h3>
        <div class="form-group row ml-4">
          <label for="sid" class="col-sm-2 col-form-label">Sid</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="Twillo-sid" id="Twillo-sid">
          </div>
        </div>
      </div>

      <div class="form-group row ml-4">
        <label for="token" class="col-sm-2 col-form-label">Token</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="Twillo-token" id="Twillo-token">
        </div>
      </div>

      <div class="form-group row ml-4">
        <label for="phone-number" class="col-sm-2 col-form-label">Имя отправителя</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="Twillo-phoneNumber" id="Twillo-phoneNumber">
        </div>
      </div>
    <div class="form-group row ml-4">
      <label for="bot-api-key" class="col-sm-2 col-form-label">Telegram API Key</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="botApiKey" id="botApiKey">
      </div>
    </div>

    <div class="form-group row ml-4">
      <label for="db-path" class="col-sm-2 col-form-label">Файл базы данных</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="dbPath" id="dbPath">
      </div>
    </div>

    <div class="form-group row ml-4">
      <label for="google-app-name" class="col-sm-2 col-form-label">Google App Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="googleAppName" id="googleAppName">
      </div>
    </div>

    <div class="form-group row ml-4">
      <label for="sendertimeout" class="col-sm-2 col-form-label">Таймаут</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="senderTimeout" id="senderTimeout">
      </div>
    </div>
    </div>
    <div id="config-admins" class="tabcontent">
      <div class="admins">
        <h3>Администраторы</h3>
        <div class="col-sm-10 ml-4">
          <button type="button" class="btn btn-primary" id="add-new-admin" onclick="addNewAdmin()">Добавить нового администратора</button>
        </div>
        <br />
        <div id="admins-to-add" class="col-sm-10"></div>
      </div>
    </div>
    <div id="config-spreadsheetlog" class="tabcontent">
      <div class="spreadsheetlog">
        <h3>Google-таблица с логами</h3>
        <div class="form-group row ml-4">
          <label for="log-id" class="col-sm-2 col-form-label">ID</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="log-id" id="log-id">
          </div>
        </div>

        <div class="form-group row ml-4">
          <label for="messages" class="col-sm-2 col-form-label">Сообщения</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="log-messages" id="log-messages">
          </div>
        </div>

        <div class="form-group row ml-4">
          <label for="errors" class="col-sm-2 col-form-label">Ошибки</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="log-errors" id="log-errors">
          </div>
        </div>

        <div class="form-group row ml-4">
          <label for="auths" class="col-sm-2 col-form-label">Авторизации</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="log-auths" id="log-auths">
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-10">
      <button type="button" onclick="toJSON()" class="btn btn-success">Сохранить</button>
    </div>
  `;
  // console.log("loadded")
  const div = document.createElement("div");
  div.setAttribute("id", "config-form");
  div.innerHTML = templateConfigurationForm;
  document.getElementById("main").innerHTML = "";
  document.getElementById("main").appendChild(div);
  // document.getElementById("tabDefaultOpen").click();
  loadConfig();
}

