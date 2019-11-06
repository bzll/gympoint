import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'Token not provided' });
	}

	// Unstructuring considering only the second element in the case that is separeted by "space" a string to result
	// on an array.
	const [, token] = authHeader.split(' ');

	try {
		const decoded = await promisify(jwt.verify)(token, authConfig.secret);

		req.userId = decoded.id;

		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Token invalid' });
	}
};
