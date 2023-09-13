import db from '../database/connection';
import { SCHEDULE_ATTRIBUTE } from '../constants';

export const SCHEDULE = db.define('schedules',SCHEDULE_ATTRIBUTE, {
    freezeTableName: true
})