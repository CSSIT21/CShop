// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

type constantsType = {
	serverPort?: string;
	databaseUrl?: string;
	jwtSecret?: string;
};

const constants: constantsType = {
	serverPort: process.env.SERVER_PORT,
	databaseUrl: process.env.DATABASE_URL,
	jwtSecret: process.env.JWT_SECRET,
};

export default constants;
