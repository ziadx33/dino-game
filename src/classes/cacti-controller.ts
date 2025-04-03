import { Cactus } from "./cactus";
import { Player } from "./player";

export class CactiController {
	CACTUS_INTERVAL_MIN = 500;
	CACTUS_INTERVAL_MAX = 2000;

	nextCactusInterval: number = null as unknown as number;
	cacti: Cactus[] = [];

	// Cacti properties
	public ctx: CanvasRenderingContext2D;
	public cactiImages: {
		image: HTMLImageElement;
		width: number;
		height: number;
	}[];
	public scaleRatio: number;
	public speed: number;
	public canvas: HTMLCanvasElement;
	constructor(
		ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		cactiImages: {
			image: HTMLImageElement;
			width: number;
			height: number;
		}[],
		scaleRatio: number,
		speed: number,
	) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.cactiImages = cactiImages;
		this.scaleRatio = scaleRatio;
		this.speed = speed;

		this.setNextCactusTime();
	}

	setNextCactusTime() {
		const num = this.getRandomNum(
			this.CACTUS_INTERVAL_MIN,
			this.CACTUS_INTERVAL_MAX,
		);

		this.nextCactusInterval = num;
	}

	getRandomNum(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	createCactus() {
		const index = this.getRandomNum(0, this.cactiImages.length - 1);
		const cactusImage = this.cactiImages[index];
		const posX = this.canvas.width * 1.5;
		const posY = this.canvas.height - cactusImage.height;
		const cactus = new Cactus(
			this.ctx,
			posX,
			posY,
			cactusImage.width,
			cactusImage.height,
			cactusImage.image,
		);

		this.cacti.push(cactus);
	}

	update(gameSpeed: number, frameTimeDelta: number) {
		if (this.nextCactusInterval <= 0) {
			this.createCactus();
			this.setNextCactusTime();
		}
		this.nextCactusInterval -= frameTimeDelta;

		this.cacti.forEach((cactus) => {
			cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
		});

		this.cacti = this.cacti.filter((cactus) => {
			return cactus.posX + cactus.width > 0;
		});
	}

	collideWith(player: Player | null) {
		return this.cacti.some((cactus) => {
			return player ? cactus.collideWith(player) : false;
		});
	}

	draw() {
		this.cacti.forEach((cactus) => {
			cactus.draw();
		});
	}

	reset() {
		this.cacti = [];
	}
}
