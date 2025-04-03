const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5;
const PLAYER_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GAME_SPEED = 0.5;
const GAME_DIFFICULTY_SPEED_START = 0.75;
const GAME_DIFFICULTY_SPEED_INCREMENT = 0.00001;
const CACTI_CONFIG = [
	{
		width: 48 / 1.4,
		height: 100 / 1.5,
		image: "/static/media/imgs/cactus_1.png",
	},
	{
		width: 98 / 1.4,
		height: 100 / 1.5,
		image: "/static/media/imgs/cactus_2.png",
	},
	{
		width: 68 / 1.4,
		height: 70 / 1.5,
		image: "/static/media/imgs/cactus_3.png",
	},
];

export {
	GAME_WIDTH,
	GAME_HEIGHT,
	PLAYER_WIDTH,
	PLAYER_HEIGHT,
	MAX_JUMP_HEIGHT,
	MIN_JUMP_HEIGHT,
	GROUND_WIDTH,
	GROUND_HEIGHT,
	GAME_SPEED,
	GAME_DIFFICULTY_SPEED_START,
	GAME_DIFFICULTY_SPEED_INCREMENT,
	CACTI_CONFIG,
};
