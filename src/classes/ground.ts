export class Ground {
	// Ground properties
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	public width: number;
	public height: number;
	public speed: number;
	public scaleRatio: number;
	public posX: number;
	public posY: number;
	public groundImage: HTMLImageElement;
	constructor(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		speed: number,
		scaleRatio: number,
	) {
		this.ctx = ctx;
		this.canvas = ctx.canvas;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.scaleRatio = scaleRatio;

		this.posX = 0;
		this.posY = this.canvas.height - this.height;

		this.groundImage = new Image();
		this.groundImage.src = "/static/media/imgs/ground.png";
	}

	draw() {
		this.ctx.drawImage(
			this.groundImage,
			this.posX,
			this.posY,
			this.width,
			this.height,
		);
		this.ctx.drawImage(
			this.groundImage,
			this.posX + this.width,
			this.posY,
			this.width,
			this.height,
		);

		if (this.posX < -this.width) {
			this.posX = 0;
		}
	}

	update(gameSpeed: number, frameTimeDelta: number) {
		this.posX -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
	}

	reset() {
		this.posX = 0;
	}
}
