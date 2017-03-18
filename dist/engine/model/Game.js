"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var Game = (function () {
    function Game(name) {
        this.phase = RenderPhase_1.RenderPhase.OFF;
        if (name)
            this.setName(name);
        this.states = new Array();
    }
    Game.prototype.init = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        return Rx_1.Observable.of(function () {
            _this.activeState.init();
        });
    };
    Game.prototype.load = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        return Rx_1.Observable.of(function () {
            _this.activeState.load().subscribe(function () {
                _this.setPhase(RenderPhase_1.RenderPhase.READY);
            });
        });
    };
    Game.prototype.update = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.UPDATING);
    };
    Game.prototype.render = function (clock) {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
    };
    Game.prototype.pause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.PAUSED);
    };
    ;
    Game.prototype.unPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.READY);
    };
    ;
    Game.prototype.unload = function () {
        this.setPhase(RenderPhase_1.RenderPhase.UNLOADING);
        return Rx_1.Observable.of(function () { });
    };
    Game.prototype.destroy = function () {
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        return Rx_1.Observable.of(function () { });
    };
    Game.prototype.getName = function () {
        return this.name;
    };
    Game.prototype.setName = function (name) {
        this.name = name;
    };
    Game.prototype.getInitialStateName = function () {
        return this.initialStateName;
    };
    Game.prototype.setInitialStateName = function (stateName) {
        this.initialStateName = stateName;
    };
    Game.prototype.getActiveState = function () {
        return this.activeState;
    };
    Game.prototype.setActiveState = function (state) {
        this.activeState = state;
    };
    Game.prototype.getFramesPerSecond = function () {
        var frameRate = this.framesPerSecond;
        if (this.getActiveState()) {
            frameRate = this.getActiveState().getFramesPerSecond()
                ? this.getActiveState().getFramesPerSecond()
                : this.framesPerSecond;
        }
        return frameRate;
    };
    Game.prototype.setFramesPerSecond = function (framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
    };
    Game.prototype.getState = function (name) {
        var foundState = null;
        this.states.some(function (state) {
            var pred = state.getName() === name;
            if (pred)
                foundState = state;
            return pred;
        });
        return foundState;
    };
    Game.prototype.addState = function (state) {
        this.states.push(state);
        return state;
    };
    Game.prototype.phaseIs = function (phase) {
        return phase === this.phase || phase === Math.floor(this.phase);
    };
    Game.prototype.getPhase = function () {
        return this.phase;
    };
    Game.prototype.setPhase = function (phase) {
        this.phase = phase;
        console.log("Game " + this.getName() + " is " + RenderPhase_1.RenderPhase[this.getPhase()]);
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=Game.js.map