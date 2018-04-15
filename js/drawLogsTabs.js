function drawLogsTabs() {
  const logsTabsTemplate = `
    <h3>Логи</h3>
    <div class="tab">
      <button class="tablinks active" onclick="switchLogs(event, 'auth')">Авторизации</button>
      <button class="tablinks" onclick="switchLogs(event, 'outcoming')">Исходящие</button>
      <button class="tablinks" onclick="switchLogs(event, 'incoming')">Входящие</button>
      <button class="tablinks" onclick="switchLogs(event, 'error')">Ошибки</button>
      <button class="tablinks" onclick="switchLogs(event, 'syserror')">Системные ошибки</button>
      <button class="tablinks" onclick="switchLogs(event, 'system')">Системные</button>
    </div>
    <div id="logs-display"></div>
  `;
  document.getElementById("main").innerHTML = logsTabsTemplate;
  loadLogsTable('auth');
}