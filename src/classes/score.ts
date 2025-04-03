export class Score {
	score = 0;
	HIGH_SCORE_KEY = "highScore";

	// Score properties
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	public scaleRatio: number;
	constructor(ctx: CanvasRenderingContext2D, scaleRatio: number) {
		this.ctx = ctx;
		this.canvas = ctx.canvas;
		this.scaleRatio = scaleRatio;
	}

	update(frameTimeDelta: number) {
		this.score += frameTimeDelta * 0.01;
	}

	reset() {
		this.score = 0;
	}

	setHighScore() {
		const highScore = Number(localStorage[this.HIGH_SCORE_KEY] ?? 0);
		if (this.score > highScore) {
			localStorage.setItem(this.HIGH_SCORE_KEY, String(Math.floor(this.score)));
		}
	}

	draw() {
		const highScore = Number(localStorage[this.HIGH_SCORE_KEY] ?? 0);
		const posY = 20 * this.scaleRatio;

		const fontSize = 20 * this.scaleRatio;
		this.ctx.font = `${fontSize}px serif`;
		this.ctx.fillStyle = "#525250";
		const scoreX = this.canvas.width - 75 * this.scaleRatio;
		const highScoreX = scoreX - 125 * this.scaleRatio;

		const scorePadded = Math.floor(this.score).toString().padStart(6, "0");
		const highScorePadded = highScore.toString().padStart(6, "0");

		this.ctx.fillText(scorePadded, scoreX, posY);
		this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, posY);
	}
}
