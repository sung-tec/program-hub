const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const pauseScreen = document.getElementById("pauseScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const hud = document.getElementById("hud");
const chargeHud = document.getElementById("chargeHud");
const jumpButton = document.getElementById("jumpButton");
const chargeFill = document.getElementById("chargeFill");
const scoreText = document.getElementById("scoreText");
const bestText = document.getElementById("bestText");
const finalScoreText = document.getElementById("finalScoreText");
const finalBestText = document.getElementById("finalBestText");
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const difficultyButtons = [...document.querySelectorAll(".difficulty")];

const WORLD_WIDTH = 420;
const WORLD_HEIGHT = 746;
const STORAGE_KEY = "sky-jumper-best-score";

const DIFFICULTIES = {
  easy: {
    label: "쉬움",
    platformWidth: 112,
    gapMin: 70,
    gapMax: 95,
    playerSpeed: 280,
    gravity: 1750,
    jumpMin: 660,
    jumpMax: 1040,
    movingChance: 0,
    vanishChance: 0,
  },
  normal: {
    label: "보통",
    platformWidth: 92,
    gapMin: 82,
    gapMax: 118,
    playerSpeed: 255,
    gravity: 1820,
    jumpMin: 650,
    jumpMax: 1040,
    movingChance: 0.28,
    vanishChance: 0,
  },
  hard: {
    label: "어려움",
    platformWidth: 70,
    gapMin: 105,
    gapMax: 150,
    playerSpeed: 235,
    gravity: 1900,
    jumpMin: 640,
    jumpMax: 1000,
    movingChance: 0.36,
    vanishChance: 0.26,
  },
};

let selectedDifficulty = "easy";
let settings = DIFFICULTIES[selectedDifficulty];
let state = "start";
let lastTime = 0;
let bestScore = Number(localStorage.getItem(STORAGE_KEY) || 0);
let score = 0;
let cameraY = 0;
let highestY = 0;
let platforms = [];
let particles = [];
let stars = [];
let chargeStart = 0;
let chargeRatio = 0;
let isCharging = false;
let keyState = { left: false, right: false };

const player = {
  x: WORLD_WIDTH / 2,
  y: WORLD_HEIGHT - 120,
  width: 34,
  height: 42,
  vx: 0,
  vy: 0,
  grounded: false,
  facing: 1,
};

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const bounds = canvas.getBoundingClientRect();
  canvas.width = Math.round(bounds.width * ratio);
  canvas.height = Math.round(bounds.height * ratio);
  ctx.setTransform(canvas.width / WORLD_WIDTH, 0, 0, canvas.height / WORLD_HEIGHT, 0, 0);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function showScreen(screen) {
  startScreen.classList.toggle("active", screen === "start");
  pauseScreen.classList.toggle("active", screen === "paused");
  gameOverScreen.classList.toggle("active", screen === "gameover");
  hud.classList.toggle("active", screen === "playing" || screen === "paused");
  chargeHud.classList.toggle("active", screen === "playing" || screen === "paused");
  jumpButton.classList.toggle("active", screen === "playing");
}

function makePlatform(y, forceSafe = false) {
  const isMoving = !forceSafe && Math.random() < settings.movingChance;
  const isVanish = !forceSafe && Math.random() < settings.vanishChance;
  return {
    x: random(18, WORLD_WIDTH - settings.platformWidth - 18),
    y,
    width: settings.platformWidth,
    height: 18,
    type: isVanish ? "vanish" : isMoving ? "moving" : "normal",
    baseX: 0,
    speed: random(55, 95) * (Math.random() > 0.5 ? 1 : -1),
    phase: random(0, Math.PI * 2),
    touched: false,
    alpha: 1,
  };
}

function resetGame() {
  settings = DIFFICULTIES[selectedDifficulty];
  score = 0;
  cameraY = 0;
  highestY = WORLD_HEIGHT - 120;
  platforms = [];
  particles = [];
  player.x = WORLD_WIDTH / 2;
  player.y = WORLD_HEIGHT - 120;
  player.vx = 0;
  player.vy = 0;
  player.grounded = true;
  player.facing = 1;
  isCharging = false;
  chargeRatio = 0;
  chargeFill.style.transform = "scaleX(0)";

  platforms.push({
    x: WORLD_WIDTH / 2 - 70,
    y: WORLD_HEIGHT - 62,
    width: 140,
    height: 18,
    type: "normal",
    speed: 0,
    phase: 0,
    touched: false,
    alpha: 1,
  });

  let y = WORLD_HEIGHT - 150;
  while (y > -260) {
    platforms.push(makePlatform(y, true));
    y -= random(settings.gapMin, settings.gapMax);
  }

  scoreText.textContent = "0";
  bestText.textContent = bestScore.toString();
  state = "playing";
  showScreen("playing");
}

function startCharge() {
  if (state !== "playing" || isCharging || !player.grounded) return;
  isCharging = true;
  chargeStart = performance.now();
  chargeRatio = 0;
  jumpButton.classList.add("charging");
}

function releaseCharge() {
  if (!isCharging) return;
  const held = performance.now() - chargeStart;
  chargeRatio = clamp(held / 650, 0, 1);
  const jumpPower = settings.jumpMin + (settings.jumpMax - settings.jumpMin) * chargeRatio;
  player.vy = -jumpPower;
  player.grounded = false;
  isCharging = false;
  chargeRatio = 0;
  chargeFill.style.transform = "scaleX(0)";
  jumpButton.classList.remove("charging");
  burst(player.x, player.y + player.height / 2, "#ffca3a", 9);
}

function burst(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x,
      y,
      vx: random(-95, 95),
      vy: random(-120, 40),
      life: random(0.28, 0.55),
      maxLife: 0.55,
      size: random(3, 7),
      color,
    });
  }
}

function spawnPlatforms() {
  let topY = platforms.reduce((min, platform) => Math.min(min, platform.y), Infinity);
  while (topY > cameraY - 230) {
    topY -= random(settings.gapMin, settings.gapMax);
    platforms.push(makePlatform(topY));
  }

  platforms = platforms.filter((platform) => platform.y < cameraY + WORLD_HEIGHT + 90 && platform.alpha > 0);
}

function updatePlatforms(dt) {
  for (const platform of platforms) {
    if (platform.type !== "moving") continue;
    platform.x += platform.speed * dt;
    if (platform.x < 12 || platform.x + platform.width > WORLD_WIDTH - 12) {
      platform.speed *= -1;
      platform.x = clamp(platform.x, 12, WORLD_WIDTH - platform.width - 12);
    }
  }

  for (const platform of platforms) {
    if (platform.type === "vanish" && platform.touched) {
      platform.alpha -= dt * 1.65;
    }
  }
}

function updatePlayer(dt) {
  const horizontal = Number(keyState.right) - Number(keyState.left);
  player.vx = horizontal * settings.playerSpeed;

  if (horizontal !== 0) {
    player.facing = horizontal;
  }

  const previousY = player.y;
  player.x += player.vx * dt;
  player.y += player.vy * dt;
  player.vy += settings.gravity * dt;

  if (player.x < -player.width) player.x = WORLD_WIDTH;
  if (player.x > WORLD_WIDTH) player.x = -player.width;

  player.grounded = false;
  if (player.vy >= 0) {
    for (const platform of platforms) {
      const withinX = player.x + player.width * 0.75 > platform.x && player.x + player.width * 0.25 < platform.x + platform.width;
      const crossed = previousY + player.height <= platform.y && player.y + player.height >= platform.y;
      if (withinX && crossed && platform.alpha > 0.15) {
        player.y = platform.y - player.height;
        player.vy = 0;
        player.grounded = true;
        if (platform.type === "vanish") platform.touched = true;
        burst(player.x + player.width / 2, platform.y, platform.type === "moving" ? "#3a86ff" : "#34d399", 6);
        break;
      }
    }
  }

  if (player.y < highestY) {
    highestY = player.y;
    score = Math.max(score, Math.floor((WORLD_HEIGHT - 120 - highestY) / 8));
    scoreText.textContent = score.toString();
  }

  const targetCamera = Math.min(cameraY, player.y - WORLD_HEIGHT * 0.42);
  cameraY += (targetCamera - cameraY) * clamp(dt * 8, 0, 1);

  if (player.y - cameraY > WORLD_HEIGHT + 70) {
    endGame();
  }
}

function updateCharge() {
  if (!isCharging) return;
  chargeRatio = clamp((performance.now() - chargeStart) / 650, 0, 1);
  chargeFill.style.transform = `scaleX(${chargeRatio})`;
}

function updateParticles(dt) {
  for (const particle of particles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy += 240 * dt;
    particle.life -= dt;
  }
  particles = particles.filter((particle) => particle.life > 0);
}

function endGame() {
  state = "gameover";
  isCharging = false;
  jumpButton.classList.remove("charging");
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem(STORAGE_KEY, bestScore.toString());
  }
  finalScoreText.textContent = score.toString();
  finalBestText.textContent = bestScore.toString();
  bestText.textContent = bestScore.toString();
  showScreen("gameover");
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, WORLD_HEIGHT);
  gradient.addColorStop(0, "#78d7ff");
  gradient.addColorStop(0.55, "#fff0a8");
  gradient.addColorStop(1, "#ffb199");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  ctx.save();
  ctx.globalAlpha = 0.9;
  for (const star of stars) {
    const y = ((star.y - cameraY * star.depth) % (WORLD_HEIGHT + 80)) - 40;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.48)";
  for (let i = 0; i < 6; i += 1) {
    const x = (i * 91 + 26) % WORLD_WIDTH;
    const y = ((i * 143 - cameraY * 0.18) % (WORLD_HEIGHT + 120)) - 60;
    drawCloud(x, y, 0.75 + (i % 3) * 0.14);
  }
}

function drawCloud(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.arc(0, 14, 18, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(22, 0, 24, Math.PI, Math.PI * 1.8);
  ctx.arc(49, 12, 20, Math.PI * 1.25, Math.PI * 0.3);
  ctx.lineTo(0, 32);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPlatform(platform) {
  const y = platform.y - cameraY;
  if (y < -50 || y > WORLD_HEIGHT + 50) return;

  ctx.save();
  ctx.globalAlpha = clamp(platform.alpha, 0, 1);
  const color = platform.type === "moving" ? "#3a86ff" : platform.type === "vanish" ? "#ff595e" : "#34d399";
  ctx.fillStyle = "rgba(20, 33, 61, 0.2)";
  roundRect(platform.x + 3, y + 7, platform.width, platform.height, 8);
  ctx.fill();
  ctx.fillStyle = color;
  roundRect(platform.x, y, platform.width, platform.height, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.62)";
  roundRect(platform.x + 8, y + 4, platform.width - 16, 5, 5);
  ctx.fill();

  if (platform.type === "vanish") {
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(platform.x + platform.width * 0.32, y + 4);
    ctx.lineTo(platform.x + platform.width * 0.48, y + 15);
    ctx.lineTo(platform.x + platform.width * 0.62, y + 5);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlayer() {
  const x = player.x;
  const y = player.y - cameraY;
  ctx.save();
  ctx.translate(x + player.width / 2, y + player.height / 2);
  ctx.scale(player.facing, 1);
  ctx.translate(-player.width / 2, -player.height / 2);

  ctx.fillStyle = "rgba(20, 33, 61, 0.2)";
  ctx.beginPath();
  ctx.ellipse(player.width / 2, player.height + 6, 17, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffca3a";
  roundRect(4, 7, 26, 30, 10);
  ctx.fill();
  ctx.fillStyle = "#14213d";
  ctx.beginPath();
  ctx.arc(20, 18, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff595e";
  ctx.beginPath();
  ctx.moveTo(3, 11);
  ctx.lineTo(16, -2);
  ctx.lineTo(29, 11);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#7c3aed";
  roundRect(5, 35, 9, 7, 4);
  roundRect(20, 35, 9, 7, 4);
  ctx.fill();
  ctx.restore();
}

function drawParticles() {
  for (const particle of particles) {
    ctx.save();
    ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y - cameraY, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function draw() {
  drawBackground();
  for (const platform of platforms) drawPlatform(platform);
  drawParticles();
  drawPlayer();
}

function loop(now) {
  const dt = Math.min((now - lastTime) / 1000 || 0, 0.033);
  lastTime = now;

  if (state === "playing") {
    updateCharge();
    updatePlatforms(dt);
    updatePlayer(dt);
    updateParticles(dt);
    spawnPlatforms();
  }

  draw();
  requestAnimationFrame(loop);
}

function togglePause() {
  if (state === "playing") {
    state = "paused";
    showScreen("paused");
  } else if (state === "paused") {
    state = "playing";
    showScreen("playing");
  }
}

function setDifficulty(difficulty) {
  selectedDifficulty = difficulty;
  difficultyButtons.forEach((button) => {
    const active = button.dataset.difficulty === difficulty;
    button.classList.toggle("active", active);
    button.setAttribute("aria-checked", active.toString());
  });
}

function setupInput() {
  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.code === "ArrowLeft" || event.code === "KeyA") keyState.left = true;
    if (event.code === "ArrowRight" || event.code === "KeyD") keyState.right = true;
    if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
      event.preventDefault();
      startCharge();
    }
    if (event.code === "KeyP" || event.code === "Escape") togglePause();
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") keyState.left = false;
    if (event.code === "ArrowRight" || event.code === "KeyD") keyState.right = false;
    if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") releaseCharge();
  });

  canvas.addEventListener("pointerdown", (event) => {
    if (state !== "playing") return;
    const bounds = canvas.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    if (localX < bounds.width / 2) keyState.left = true;
    if (localX >= bounds.width / 2) keyState.right = true;
  });

  canvas.addEventListener("pointerup", () => {
    keyState.left = false;
    keyState.right = false;
  });

  canvas.addEventListener("pointercancel", () => {
    keyState.left = false;
    keyState.right = false;
  });

  jumpButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    startCharge();
  });

  jumpButton.addEventListener("pointerup", (event) => {
    event.preventDefault();
    releaseCharge();
  });

  jumpButton.addEventListener("pointercancel", releaseCharge);
}

function init() {
  stars = Array.from({ length: 42 }, () => ({
    x: random(8, WORLD_WIDTH - 8),
    y: random(0, WORLD_HEIGHT + 80),
    size: random(1.4, 3.8),
    depth: random(0.08, 0.28),
    color: Math.random() > 0.5 ? "rgba(255,255,255,0.78)" : "rgba(255,202,58,0.46)",
  }));

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  bestText.textContent = bestScore.toString();

  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => setDifficulty(button.dataset.difficulty));
  });

  startButton.addEventListener("click", resetGame);
  restartButton.addEventListener("click", resetGame);
  pauseButton.addEventListener("click", togglePause);
  resumeButton.addEventListener("click", togglePause);
  setupInput();
  showScreen("start");
  requestAnimationFrame(loop);
}

init();
