import winston from "winston";

const logLevel = process.env.LOGLEVEL || "debug";
const dbLogLevel = process.env.DB_LOG_LEVEL || "error";

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level: logLevel
		})
	]
});

export default logger;
