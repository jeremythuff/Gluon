import * as THREE from "three";
import Game from "./Game";

import {RenderPhase} from "../enum/RenderPhase";

/**
 * This Engine class drives the animation loop and starts and stops your instance of the [[Game]]. 
 * It gets connected to your game via the [[GameMain]] decorator.
 */
export default class Engine {
	
	private clock : THREE.Clock;
	private running: boolean;
	private game: Game;

	private defaultFramesPerSecond :number = 30;
	private framesPerSecond :number;
	private lastFrameTime = 0;

	constructor(game: Game) {
		this.setGame(game);
		this.clock = new THREE.Clock();
	}

	private animationLoop() {
		if(this.running) {
			window.requestAnimationFrame(this.animationLoop.bind(this));
			const delta =  this.clock.getDelta();
			const now = this.clock.getElapsedTime();
			
			if(this.game && this.game.phaseIs(RenderPhase.RUNNING)) this.game.update(delta);

			const gameFramesPerSecond :number = this.getGame().getFramesPerSecond();
			const currentFramesPerSecond :number = gameFramesPerSecond?gameFramesPerSecond:this.framesPerSecond;

			if(this.game && this.game.phaseIs(RenderPhase.RUNNING) && (now - this.lastFrameTime)*1000 > (1000 / currentFramesPerSecond)) {
				this.lastFrameTime = now;
				this.game.render(delta);
			}	
		}
	}

	getGame() : Game {
		return this.game;
	}

	setGame(game:Game) : void {
		this.game = game;
	}

	start() :Game {
		
		let game = this.getGame();
		const gameFramesPerSecond :number = this.getGame().getFramesPerSecond();
		this.framesPerSecond = gameFramesPerSecond?gameFramesPerSecond:this.defaultFramesPerSecond;

		game.setPhase(RenderPhase.START);
		game.init().subscribe(()=>{
			game.load().subscribe(()=>{
				this.running = true;
				this.animationLoop();
				game.setPhase(RenderPhase.RUNNING);
				setTimeout(()=>{this.stop();}, 5000);
			});
		});
		
		return game;
	}

	stop() :void {
		const game = this.getGame();
		game.setPhase(RenderPhase.STOP);
		game.unload().subscribe(()=>{
			game.destroy().subscribe(()=>{
				game.setPhase(RenderPhase.OFF);
				this.running=false;
			});
		});
	}

}