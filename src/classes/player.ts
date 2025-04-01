export class Player {
	WALK_ANIMATION_TIMER = 200;
	walkAnimationTimer: number = this.WALK_ANIMATION_TIMER;
	dinoRunImages: HTMLImageElement[] = [];

	jumpPressed = false;
	jumpInProgress = false;
	falling = false;
	JUMP_SPEED = 0.45;
	GRAVITY = 0.3;

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
	public initY: number;
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
		this.initY = this.posY;

		this.standingImage = new Image();
		this.standingImage.src = "/static/media/imgs/standing_still.png";

		this.image = this.standingImage;

		const dinoRunImage1 = new Image();
		dinoRunImage1.src = "/static/media/imgs/dino_run1.png";

		const dinoRunImage2 = new Image();
		dinoRunImage2.src = "/static/media/imgs/dino_run2.png";

		this.dinoRunImages.push(dinoRunImage1);
		this.dinoRunImages.push(dinoRunImage2);

		// keyboard
		window.removeEventListener("keydown", this.keydown);
		window.removeEventListener("keyup", this.keyup);

		window.addEventListener("keydown", this.keydown);
		window.addEventListener("keyup", this.keyup);

		// touch
		window.addEventListener("touchstart", this.touchstart);
		window.addEventListener("touchend", this.touchend);

		window.removeEventListener("touchstart", this.touchstart);
		window.removeEventListener("touchend", this.touchend);
	}

	keydown = (event: KeyboardEvent) => {
		if (event.code === "Space") {
			this.jumpPressed = true;
		}
	};

	keyup = (event: KeyboardEvent) => {
		if (event.code === "Space") {
			this.jumpPressed = false;
		}
	};

	touchstart = () => {
		this.jumpPressed = true;
	};

	touchend = () => {
		this.jumpPressed = false;
	};

	draw() {
		this.ctx.drawImage(
			this.image,
			this.posX,
			this.posY,
			this.width,
			this.height,
		);
	}

	update(gameSpeed: number, frameTimeDelta: number) {
		this.run(gameSpeed, frameTimeDelta);

		if (this.jumpInProgress) {
			this.image = this.standingImage;
		}
		this.jump(frameTimeDelta);
	}

	jump(frameTimeDelta: number) {
		if (this.jumpPressed) {
			this.jumpInProgress = true;
		}
		if (this.jumpInProgress && !this.falling) {
			if (
				this.posY > this.canvas.height - this.minJumpHeight ||
				(this.posY > this.canvas.height - this.maxJumpHeight &&
					this.jumpPressed)
			) {
				this.posY -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
			} else {
				this.falling = true;
			}
		} else {
			if (this.posY < this.initY) {
				this.posY += this.GRAVITY * frameTimeDelta * this.scaleRatio;
				if (this.posY + this.height > this.canvas.height) {
					this.posY = this.initY;
				}
			} else {
				this.falling = false;
				this.jumpInProgress = false;
			}
		}
	}

	run(gameSpeed: number, frameTimeDelta: number) {
		if (this.walkAnimationTimer <= 0) {
			if (this.image === this.dinoRunImages[0]) {
				this.image = this.dinoRunImages[1];
			} else this.image = this.dinoRunImages[0];
			this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
		}
		this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
	}
}
