// Importing necessary modules
import jwt from 'jsonwebtoken'
import { userModel } from '../DB/models/user.model.js';
import HttpStatus from 'http-status-codes';

// Middleware function for user authentication
export const auth = () => {
    try {
        return async (req, res, next) => {
            // Extracting authorization header from request
            const { authorization } = req.headers;
            // Checking if authorization header exists and starts with 'Bearer'
            if (!authorization || !authorization.startsWith('Bearer')) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid token or not sent" });
            }
            // Extracting token from authorization header
            const token = authorization.split(" ")[1];

            try {
                // Verifying the token using the secret key ('todo')
                const verified = jwt.verify(token, 'todo');
                // Checking if token verification failed
                if (!verified) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid token" });
                }
                // Finding user by ID extracted from the token
                const user = await userModel.findById(verified.id);

                if (!user) {
                    return res.status(HttpStatus.NOT_FOUND).json({ message: "Invalid user" });
                }
                // Adding user object to request for further use in the route handler
                req.user = user;
                // Passing control to the next middleware or route handler
                next();
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error verifying token", error });
            }
        };
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error', error });
    }
};
