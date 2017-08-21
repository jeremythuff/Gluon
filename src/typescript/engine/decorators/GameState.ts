import "reflect-metadata";

import State from "../model/State"
import Mode from "../model/Mode"
import ControlProfile from "../util/io/ControlProfile";

import * as GameMainRegistry from "../registries/GameMainRegistry";
import * as GameStateRegistry from "../registries/GameStateRegistry";
import * as GameModeRegistry from "../registries/GameModeRegistry";
import * as GameControllereRegistry from "../registries/GameControllerRegistry";

import { Controllable } from "../model/interface/Controllable";

import { StateOptions } from "../model/interface/StateOptions"

/**
 * This function is used to decorate classes which extend [[State]]. It registers and 
 * instantiates such classes within your main game instance.
 *
 * @decorator Class<typeof State>
 */
export default function GameState(options?: StateOptions) {

	return function (decorated: typeof State): void {

		Reflect.defineMetadata("options", options, decorated);

		const state = new decorated();
		if (!state.getName()) state.setName(decorated.name);

		GameModeRegistry.getGameModeObservable().subscribe(Mode => {
			if ((options.modes).some(mode => {
				return mode.name === Mode.name;
			})) {

				const mode = new Mode();
				mode.setName(Mode.name);

				const modeOption: { [name: string]: any[] | string } = Reflect.getMetadata("options", Mode);

				GameControllereRegistry.getControlProfileObservable().subscribe(ControlProfile => {
					if ((<string[]>modeOption["controlProfiles"]).some(controlProfileName => {
						return controlProfileName === ControlProfile.name;
					})) {

						const newControllerProfile: ControlProfile<Controllable> = new ControlProfile<Controllable>(mode);
						const whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
						const whenMap = GameControllereRegistry.getWhenCBMapByName(ControlProfile.name);

						newControllerProfile.setWhileCBs(whileMap);
						newControllerProfile.setWhenCBs(whenMap);

						mode.addControlProfile(newControllerProfile);
					}
				});

				state.addMode(mode);
			}

		});

		GameControllereRegistry.getControlProfileObservable().subscribe(ControlProfile => {

			const controlProfiles = options?(options.controlProfiles):null;

			if (controlProfiles && controlProfiles.some(controlProfile => {
				return controlProfile.name === ControlProfile.name;
			})) {
				const newControllerProfile: ControlProfile<Controllable> = new ControlProfile<Controllable>(state);
				const whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
				const whenMap = GameControllereRegistry.getWhenCBMapByName(ControlProfile.name);
				newControllerProfile.setWhileCBs(whileMap);
				newControllerProfile.setWhenCBs(whenMap);
				state.addControlProfile(newControllerProfile);
			}
		});

		GameMainRegistry.getGameMainSubject().subscribe(game => {
			if (game) {
				console.log(`Registering State: ${state.getName()}`);
				GameStateRegistry.addGameState(state);
			}
		});

	}
}