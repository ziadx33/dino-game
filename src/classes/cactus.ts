import { Player } from "./player";

export class Cactus {
	// Cactus properties
	public ctx: CanvasRenderingContext2D;
	public posX: number;
	public posY: number;
	public width: number;
	public height: number;
	public image: HTMLImageElement;
	constructor(
		ctx: CanvasRenderingContext2D,
		posX: number,
		posY: number,
		width: number,
		height: number,
		image: HTMLImageElement,
	) {
		this.ctx = ctx;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.image = image;
	}

	update(
		speed: number,
		gameSpeed: number,
		frameTimeDelta: number,
		scaleRatio: number,
	) {
		this.posX -= speed * gameSpeed * frameTimeDelta * scaleRatio;
	}

	collideWith(player: Player) {
		const adjustBy = 1.4;

		return (
			player.posX < this.posX + this.width / adjustBy &&
			player.posX + player.width / adjustBy > this.posX &&
			player.posY < this.posY + this.height / adjustBy &&
			player.height + player.posY / adjustBy > this.posY
		);
	}

	draw() {
		this.ctx.drawImage(
			this.image,
			this.posX,
			this.posY,
			this.width,
			this.height,
		);
	}
}
