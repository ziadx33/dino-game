export class Player {
	// Player properties
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	public width: number;
	public height: number;
	public minJumpHeight: number;
	public maxJumpHeight: number;
	public scaleRatio: number;
	public posX: number;
	public posY: number;
	public standingImage: HTMLImageElement;
	public image: HTMLImageElement;
	constructor(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		minJumpHeight: number,
		maxJumpHeight: number,
		scaleRatio: number,
	) {
		this.ctx = ctx;
		this.canvas = ctx.canvas;
		this.width = width;
		this.height = height;
		this.minJumpHeight = minJumpHeight;
		this.maxJumpHeight = maxJumpHeight;
		this.scaleRatio = scaleRatio;
		this.posX = 10 * scaleRatio;
		this.posY = this.canvas.height - this.height - 1.5 * scaleRatio;

		this.standingImage = new Image();
		this.standingImage.src = "/static/media/imgs/standing_still.png";

		this.image = this.standingImage;
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
