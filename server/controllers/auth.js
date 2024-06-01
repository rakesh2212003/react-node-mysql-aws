import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { getConnection } from '../config/mysql.js'
import userTable from '../models/user.js'
import { getIdFromEmail, createUser, getUserFromId } from '../query/user.js'

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    let connection;

    try {
        connection = await getConnection();
        await connection.execute(userTable);

        const [rows] = await connection.execute(getIdFromEmail, [email]);
        if (rows.length !== 0) {
            return res.status(400).json({ success: false, message: 'User already exist' });
        }

        const id = uuidv4();
        const name = `${firstname} ${lastname}`;
        const hashPassword = await bcrypt.hash(password, 10);

        await connection.execute(createUser, [id, name, email, hashPassword]);
        const [users] = await connection.execute(getUserFromId, [id]);
        const user = users[0];

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            success: true,
            message: 'User created',
            data: {
                token: token,
                user: user
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    let connection, userId;

    try {
        connection = await getConnection();

        const [rows] = await connection.execute(getIdFromEmail, [email]);
        if (rows.length === 0) {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        userId = rows[0].id;

        const [users] = await connection.execute(getUserFromId, [userId]);
        const user = users[0];

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            data: {
                token: token,
                user: user
            }
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};