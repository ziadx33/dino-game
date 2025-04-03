import { CactiController } from "./classes/cacti-controller";
import { Ground } from "./classes/ground";
import { Player } from "./classes/player";
import { Score } from "./classes/score";
import {
	CACTI_CONFIG,
	GAME_DIFFICULTY_SPEED_INCREMENT,
	GAME_DIFFICULTY_SPEED_START,
	GAME_HEIGHT,
	GAME_SPEED,
	GAME_WIDTH,
	GROUND_HEIGHT,
	GROUND_WIDTH,
	MAX_JUMP_HEIGHT,
	MIN_JUMP_HEIGHT,
	PLAYER_HEIGHT,
	PLAYER_WIDTH,
} from "./constants";
import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
if (!canvas) {
	throw new Error("Canvas not found");
}
const ctx = canvas.getContext("2d")!;

let scaleRatio: null | number = null;
let prevTime: null | number = null;
let gameSpeed = GAME_DIFFICULTY_SPEED_START;
let gameOver = false;
let restartEvent = false;
let waitingToStart = true;

// game objects
let player: Player | null = null;
let ground: Ground | null = null;
let cactiController: CactiController | null = null;
let score: Score | null = null;

function createSprites() {
	if (!scaleRatio) return;
	// player sprite
	const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
	const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
	const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
	const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

	player = new Player(
		ctx,
		playerWidthInGame,
		playerHeightInGame,
		minJumpHeightInGame,
		maxJumpHeightInGame,
		scaleRatio,
	);

	// ground sprite

	const groundWidthInGame = GROUND_WIDTH * scaleRatio;
	const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

	ground = new Ground(
		ctx,
		groundWidthInGame,
		groundHeightInGame,
		GAME_SPEED,
		scaleRatio,
	);

	const cactiImages = CACTI_CONFIG.map((cacti) => {
		const image = new Image();
		image.src = cacti.image;
		return {
			image,
			width: cacti.width * scaleRatio!,
			height: cacti.height * scaleRatio!,
		};
	});

	cactiController = new CactiController(
		ctx,
		canvas,
		cactiImages,
		scaleRatio,
		GAME_SPEED,
	);

	score = new Score(ctx, scaleRatio);
}

// screens support

function setScreen() {
	scaleRatio = getScaleRatio();
	canvas.width = GAME_WIDTH * scaleRatio;
	canvas.height = GAME_HEIGHT * scaleRatio;

	createSprites();
}

setScreen();

window.addEventListener("resize", setScreen);
screen.orientation.addEventListener("change", setScreen);

function getScaleRatio() {
	const screenHeight = Math.min(
		window.innerHeight,
		document.documentElement.clientHeight,
	);
	const screenWidth = Math.min(
		window.innerWidth,
		document.documentElement.clientWidth,
	);

	// window is wider than the game width
	if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
		return screenWidth / GAME_WIDTH;
	}
	return screenHeight / GAME_HEIGHT;
}

function resetListeners() {
	addEventListener("keyup", reset, { once: true });
	addEventListener("touchstart", reset, { once: true });
}

function showGameOver() {
	const fontSize = 40 * (scaleRatio ?? 0);
	ctx.font = `${fontSize}px Verdana`;
	ctx.fillStyle = "grey";
	const x = canvas.width / 14;
	const y = canvas.height / 2;
	ctx.fillText("Tap Screen or Press Space To Start", x, y);
}

function showStartText() {
	const fontSize = 40 * (scaleRatio ?? 0);
	ctx.font = `${fontSize}px Verdana`;
	ctx.fillStyle = "grey";
	const x = canvas.width / 14;
	const y = canvas.height / 2;
	ctx.fillText("Tap Screen or Press Space To Start", x, y);
}

function setupGameReset() {
	if (!restartEvent) {
		restartEvent = true;

		setTimeout(() => {
			resetListeners();
		}, 1000);
	}
}

function updateGameSpeed(frameTimeDelta: number) {
	gameSpeed += frameTimeDelta * GAME_DIFFICULTY_SPEED_INCREMENT;
}

function clearScreen() {
	if (!ctx) return;
	ctx.fillStyle = "white";
	ctx?.fillRect(0, 0, canvas.width, canvas.height);
}

function reset() {
	restartEvent = false;
	gameOver = false;
	waitingToStart = false;
	ground?.reset();
	cactiController?.reset();
	score?.reset();
	gameSpeed = GAME_DIFFICULTY_SPEED_START;
}

function gameLoop(frameTime: number) {
	if (prevTime === null) {
		prevTime = frameTime;
		requestAnimationFrame(gameLoop);
		return;
	}
	const frameTimeDelta = frameTime - prevTime;
	prevTime = frameTime;
	clearScreen();

	// Update game objects
	if (!gameOver && !waitingToStart) {
		ground?.update(gameSpeed, frameTimeDelta);
		cactiController?.update(gameSpeed, frameTimeDelta);
		player?.update(gameSpeed, frameTimeDelta);
		score?.update(frameTimeDelta);
		updateGameSpeed(frameTimeDelta);
	}

	if (!gameOver && cactiController?.collideWith(player)) {
		gameOver = true;
		setupGameReset();
		score?.setHighScore();
	}

	// Draw game objects
	player?.draw();
	cactiController?.draw();
	ground?.draw();
	score?.draw();

	if (gameOver) {
		showGameOver();
	}

	if (waitingToStart) {
		showStartText();
	}

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

resetListeners();
