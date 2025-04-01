import { Ground } from "./classes/ground";
import { Player } from "./classes/player";
import {
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

// game objects
let player: Player | null = null;
let ground: Ground | null = null;

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

function clearScreen() {
	if (!ctx) return;
	ctx.fillStyle = "white";
	ctx?.fillRect(0, 0, canvas.width, canvas.height);
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
	ground?.update(gameSpeed, frameTimeDelta);
	player?.update(gameSpeed, frameTimeDelta);

	// Draw game objects
	player?.draw();
	ground?.draw();

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
