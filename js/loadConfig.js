window.addEventListener('onload', loadConfig());
function loadConfig() {
  const url = '../json/config.json';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log('data');
      // console.log(data);
      loadTwillo(data);
      loadRest(data);
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(config);
}

function loadTwillo(config) {
  const keys = Object.keys(config.Twillo);
  keys.forEach(key => {
    // console.log(document.getElementById(`Twillo-${key}`))
    document.getElementById(`Twillo-${key}`).value = config.Twillo[key];
  });
}

function loadRest(config) {
  const keys = Object.keys(config)
    .filter(key => typeof config[key] !== 'object');
  // console.log(keys)
  keys.forEach(key => {
    document.getElementById(`${key}`).value = config[key];
    // console.log(key)
  });
}