"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const program = new commander_1.Command();
program.name('Yuu').description('CLI for convenient tools command').version('1.0.0');
const commandFiles = fs_1.default.readdirSync((0, index_1.handlePath)('./commands', __dirname)).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { default: command } = require((0, index_1.handlePath)(`./commands/${file}`, __dirname));
    command(program);
}
program.parse();
