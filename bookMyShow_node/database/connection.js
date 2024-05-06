import { createConnection } from "mysql2";
import properties from './properties.js';

export function getConnection() {
    return createConnection(properties);
}