import { RenderCycle } from "./interface/RenderCycle";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import State from "./State";
import { RenderPhase } from "../enum/RenderPhase";
import { GameInitCB } from "./interface/GameInitCB";
import { GameLoadCB } from "./interface/GameLoadCB";
import { GameUpdateCB } from "./interface/GameUpdateCB";
import { GameRenderCB } from "./interface/GameRenderCB";
import { GamePauseCB } from "./interface/GamePauseCB";
import { GameUnPauseCB } from "./interface/GameUnPauseCB";
import { GameUnloadCB } from "./interface/GameUnloadCB";
import { GameDestroyCB } from "./interface/GameDestroyCB";
export default class Game implements RenderCycle {
    phase: RenderPhase;
    private name;
    private framesPerSecond;
    private initialStateName;
    private activeState;
    private states;
    private initCBs;
    private loadCBs;
    private updateCBs;
    private renderCBs;
    private pauseCBs;
    private unPauseCBs;
    private unloadCBs;
    private destroyCBs;
    constructor(name?: string);
    runInit(): Observable<GameInitCB>;
    init(initCB: GameInitCB): void;
    runLoad(): Observable<GameLoadCB>;
    load(cb: GameLoadCB): void;
    runUpdate(delta: number): void;
    update(cb: GameUpdateCB): void;
    runRender(delta: number): void;
    render(cb: GameRenderCB): void;
    runPause(): void;
    pause(cb: GamePauseCB): void;
    runUnPause(): void;
    unPause(cb: GameUnPauseCB): void;
    runUnload(): Observable<GameUnloadCB>;
    unload(cb: GameUnloadCB): void;
    runDestroy(): Observable<{}>;
    destroy(cb: GameDestroyCB): void;
    getName(): string;
    setName(name: string): void;
    getInitialStateName(): string;
    setInitialStateName(stateName: string): void;
    getActiveState(): State;
    setActiveState(state: State): void;
    getFramesPerSecond(): number;
    setFramesPerSecond(framesPerSecond: number): void;
    getState(name: string): State;
    addState(state: State): State;
    phaseIs(phase: RenderPhase): boolean;
    getPhase(): RenderPhase;
    setPhase(phase: RenderPhase): void;
}
