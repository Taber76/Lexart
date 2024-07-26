"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_controller_1 = __importDefault(require("../controllers/utils.controller"));
// API /api/v1/utils
exports.default = express_1.default
    .Router()
    // cron jobs
    .get("/send_event_reminders", utils_controller_1.default.sendEventReminders);
