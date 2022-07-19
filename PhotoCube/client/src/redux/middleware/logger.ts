/**
 * This module contains the Redux logger middleware.
 * https://www.npmjs.com/package/redux-logger
 */

export const Logger = require("redux-logger")
    .createLogger(
        {
            collapsed: true,
            duration: true,
            timestamp: true,
            level: "log",
        }
    )