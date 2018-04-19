function drawLogsTabs() {
  const logsTabsTemplate = `
    <h3 class="ml-3">Логи</h3>
    <div class="form-group row ml-3">
      <div class="input-group-prepend">
        <div class="input-group-text">Отображать</div>
      </div>
      <div class="col-sm-10 p-0">
        <select
        class="form-control col-sm-2"
        id="how-many-logs-display"
        onchange="changeLimitLogs(this.value)">
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>50</option>
          <option>100</option>
          <option>200</option>
          <option>Все</option>
        </select>
      </div>
    </div>
    <div class="tab">
      <button class="tablinks active" onclick="switchLogs(event, 'auth')">Авторизации</button>
      <button class="tablinks" onclick="switchLogs(event, 'outgoing')">Исходящие</button>
      <button class="tablinks" onclick="switchLogs(event, 'incoming')">Входящие</button>
      <button class="tablinks" onclick="switchLogs(event, 'error')">Ошибки</button>
      <button class="tablinks" onclick="switchLogs(event, 'syserror')">Системные ошибки</button>
      <button class="tablinks" onclick="switchLogs(event, 'system')">Системные</button>
      <button class="tablinks" onclick="switchLogs(event, 'history')">История по пользователю</button>
    </div>
    <div id="logs-display"></div>
  `;
  document.getElementById("main").innerHTML = logsTabsTemplate;
  loadLogsTable('auth');
}