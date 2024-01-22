const toggleSwitch = document.querySelector('#dark-mode-toggle');

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } 
}
toggleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) { 
  document.documentElement.setAttribute('data-theme', currentTheme);

 if (currentTheme === 'dark') { 
   toggleSwitch.checked = true; 
 }
}

const startBtn = document.getElementById('start-btn');
const deployBtn = document.getElementById('deploy-btn');
const deleteBtn = document.getElementById('delete-btn');

let stopBtn, restartBtn;

startBtn.addEventListener('click', () => {
  const { spawn } = require('child_process');
  const botProcess = spawn('node', ['../bot/index.js'], { cwd: __dirname });
  startBtn.style.display = 'none';
  stopBtn = document.createElement('button'); 
  stopBtn.setAttribute('id', 'stop-btn'); 
  stopBtn.setAttribute('class', 'rounded-btn stop-btn'); 
  stopBtn.textContent = 'STOP'; 
  stopBtn.addEventListener('click', () => {
    botProcess.kill(); 
    stopBtn.style.display = 'none'; 
    restartBtn.style.display = 'none'; 
    startBtn.style.display = 'inline-block'; 
  });
  restartBtn = document.createElement('button');
  restartBtn.setAttribute('id', 'restart-btn'); 
  restartBtn.setAttribute('class', 'rounded-btn restart-btn');
  restartBtn.textContent = 'RESTART';
  restartBtn.addEventListener('click', () => { 
    botProcess.kill();
    const newBotProcess = spawn('node', ['../bot/index.js'], { cwd: __dirname }); botProcess = newBotProcess; });
  deployBtn.style.display = 'none';
  deleteBtn.style.display = 'none'; 
  startBtn.parentNode.insertBefore(stopBtn, startBtn.nextSibling);
  startBtn.parentNode.insertBefore(restartBtn, startBtn.nextSibling); 
});

deployBtn.addEventListener('click', () => {
  const { spawn } = require('child_process');
  spawn('node', ['../bot/deploy-commands.js'], { cwd: __dirname }); 
});

deleteBtn.addEventListener('click', () => {
  const { spawn } = require('child_process');
  spawn('node', ['../bot/delete-commands.js'], { cwd: __dirname }); 
});
