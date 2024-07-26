"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_dao_1 = __importDefault(require("../daos/event.dao"));
const email_helper_1 = __importDefault(require("../helpers/email.helper"));
const print_1 = __importDefault(require("../utils/print"));
const environment_1 = require("../config/environment");
class UtilsService {
    constructor() { }
    // ERROR HANDLING -------------------------------------------------------------
    static handleError(error, success, console) {
        print_1.default.error(console);
        return { success, message: '' + error };
    }
    // CRON JOBS -------------------------------------------------------------------
    // Check events and send reminders
    static sendEventReminders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nowDate = new Date();
                const events = yield event_dao_1.default.findAllByStatus('scheduled');
                for (let event of events) {
                    const eventDate = new Date(event.date);
                    const diff = eventDate.getTime() - nowDate.getTime();
                    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                    if (diffDays === environment_1.REMINDER_DAYS) {
                        const eventGuest = yield event_dao_1.default.getGuestsByEventId(event.id, 'jfgfhg');
                        for (let guest of eventGuest) {
                            yield email_helper_1.default.sendEventReminder(guest.guest_email, event.name, event.address, event.date, 123456, guest.guest_fullname, guest.invitation_id);
                        }
                    }
                }
            }
            catch (error) {
                return this.handleError(error, false, 'Service sending event reminders [TestService]');
            }
        });
    }
}
exports.default = UtilsService;
