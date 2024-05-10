"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.writeFile = exports.handlePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlePath = (filePath, baseUrl = path_1.default.resolve(process.cwd(), './build/src')) => path_1.default.join(baseUrl, filePath);
exports.handlePath = handlePath;
const writeFile = (filePath, data, basePath) => {
    const pathname = filePath.replace(/^\.*\/|\/?[^/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    const pathDir = (0, exports.handlePath)(pathname, basePath);
    if (!fs_1.default.existsSync(pathDir)) {
        fs_1.default.mkdirSync(pathDir, { recursive: true });
    }
    const fileDir = (0, exports.handlePath)(filePath, basePath);
    fs_1.default.writeFileSync(fileDir, data, { flag: 'w' });
};
exports.writeFile = writeFile;
const readFile = (filePath, basePath) => {
    const fileDir = (0, exports.handlePath)(filePath, basePath);
    if (!fs_1.default.existsSync(fileDir))
        return null;
    return fs_1.default.readFileSync(fileDir, 'utf-8');
};
exports.readFile = readFile;
