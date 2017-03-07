import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
export interface RenderCycle {
    init(): Observable<any>;
    load(): Observable<any>;
    update(clock?: number): void;
    render(clock?: number): void;
    destroy(): void;
}
