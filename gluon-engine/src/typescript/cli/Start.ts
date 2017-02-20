#!/usr/bin/env node

import {CliCommand} from "./CliCommand"

import * as shelljs from "shelljs";
import * as path from 'path';

import * as process from 'process';

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");

export default class Start implements CliCommand {
	execute(args :Array<string>) {

		console.log(colors.green.underline("Starting Gluon..."));

		const execustionPath = path.resolve("node_modules", "gluon-engine", "dist", "launcher", "Launcher.js");
		const mainJsPath = path.resolve(process.cwd(), args[0]);
		const mainHtmlPath = `${__dirname}/../engine/main.html`;

		shelljs.sed("-i", "{MAIN_JS}", mainJsPath, mainHtmlPath);

		nodecli.exec("electron", execustionPath + " " + mainHtmlPath);
	}
}