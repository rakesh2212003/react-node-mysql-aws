import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { getConnection } from '../../config/mysql.js'
import { getIdFromEmail, createUser, getUserFromId, getUserFromUsername } from '../../queries/users.js'
import { isValidString, isValidUsername, isValidEmail, isValidPassword } from '../../validations'

export const signup = async (req, res) => {
    let connection, existingUsers;

    try {
        const { username, first_name, last_name, email, password } = req.body;

        if (!first_name || !username || !email || !password) {
            return res.status(400).json({ success: false, message: 'firstname, username, email & password is required' });
        }
        if(!isValidString(first_name) || !isValidString(last_name)){
            return res.status(400).json({ success: false, message: 'Name will not contain white spaces' });
        }
        if (!isValidUsername(username)) {
            return res.status(400).json({ success: false, message: 'Username can only contain letters, numbers, and underscores' });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Provide a proper email address' });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain atleast 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character' });
        }

        connection = await getConnection();

        [existingUsers] = await connection.execute(getUserFromUsername, [username]);
        if (existingUsers.length !== 0) {
            return res.status(400).json({ success: false, message: 'Username not available' });
        }

        [existingUsers] = await connection.execute(getIdFromEmail, [email]);
        if (existingUsers.length !== 0) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const id = uuidv4();
        const hashPassword = await bcrypt.hash(password, 10);

        await connection.execute(createUser, [id, username, first_name, last_name, email, hashPassword]);
        const [users] = await connection.execute(getUserFromId, [id]);
        const user = users[0];

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token: token,
                user: user
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export const login = async (req, res) => {
    let connection, userId;
    let existingUsers;

    try {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail) {
            return res.status(400).json({ success: false, message: 'Username or email is required' });
        }

        connection = await getConnection();

        const isEmail = usernameOrEmail.includes('@');

        if (isEmail) {
            if (!isValidEmail(usernameOrEmail)) {
                return res.status(400).json({ success: false, message: 'Provide a proper email address' });
            }
            [existingUsers] = await connection.execute(getIdFromEmail, [usernameOrEmail]);
        } else {
            [existingUsers] = await connection.execute(getUserFromUsername, [usernameOrEmail]);
        }

        if (existingUsers.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid username or email or password' });
        }
        userId = existingUsers[0].id;

        const [users] = await connection.execute(getUserFromId, [userId]);
        const user = users[0];

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: 'Invalid username or email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token: token,
                user: user
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}