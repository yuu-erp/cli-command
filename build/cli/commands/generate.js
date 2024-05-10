"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const template_1 = require("../../utils/template");
const inquirer_1 = __importDefault(require("inquirer"));
exports.default = (program) => {
    return program
        .command('generate')
        .description('Generate scraper file.')
        .action(async () => {
        const answers = await inquirer_1.default.prompt([
            {
                type: 'list',
                message: 'What is the type of the scraper?',
                name: 'type',
                choices: [
                    {
                        name: 'Anime',
                        value: 'anime'
                    },
                    {
                        name: 'Manga',
                        value: 'manga'
                    }
                ]
            },
            {
                type: 'input',
                message: 'What is the ID of the scraper?',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What is the name of the scraper?',
                name: 'name'
            }
        ]);
        console.log('answers: ', answers);
        const templateFileName = answers.type === 'anime' ? 'AnimeScraper.ts' : 'MangaScraper.ts';
        console.log('templateFileName: ', templateFileName);
        const template = (0, utils_1.readFile)(`./src/cli/templates/${templateFileName}`, process.cwd());
        console.log('template: ', template);
        const scraperDirectory = answers.type === 'anime' ? './src/generate/anime/' : './src/generate/manga/';
        console.log('scraperDirectory: ', scraperDirectory);
        const scraperFile = `${scraperDirectory}${answers.id}.ts`;
        const replacedTemplate = (0, template_1.replaceTemplate)(template || '', [
            {
                replacer: '__name__',
                value: answers.name
            },
            {
                replacer: '__id__',
                value: answers.id
            }
        ]);
        (0, utils_1.writeFile)(scraperFile, replacedTemplate, process.cwd());
        console.log(`Scraper file generated at ${scraperFile}`);
    });
};
