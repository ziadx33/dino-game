import { Player } from "./classes/player";
import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
if (!canvas) {
	throw new Error("Canvas not found");
}
const ctx = canvas.getContext("2d")!;

let scaleRatio: null | number = null;
let prevTime: null | number = null;

// constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5;
const PLAYER_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;

// game objects
let player: Player | null = null;

function createSprites() {
	if (!scaleRatio) return;
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

	// Draw game objects
	player?.draw();
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
