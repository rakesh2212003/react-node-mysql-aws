import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { getConnection } from '../config/mysql.js'
import userTable from '../models/user.js'
import { createUser, findEmail, getUser } from '../query/user.js'

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const id = uuidv4();
        const name = firstname + ' ' + lastname;
        const hashPassword = await bcrypt.hash(password, 10);

        const connection = await getConnection();
        await connection.execute(userTable);
        const [rows] = await connection.execute(findEmail, [email]);
        if (rows.length !== 0) {
            return res.status(401).json({ success: false, message: 'User already exist' });
        }
        await connection.execute(createUser, [id, name, email, hashPassword]);
        const [user] = await connection.execute(getUser, [id]);
        await connection.end();

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

        return res.status(201).json({ 
            success: true,
            message: 'User created',
            data: {
                token: token,
                name: user[0].name,
                email: user[0].email,
                avatar: user[0].avatar,
                created_on: user[0].created_on,
                updated_on: user[0].updated_on,
            }
        });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const  { email, password } = req.body;
    try{
        const connection = await getConnection();
        const [user] = await connection.execute(findEmail, [email]);
        if(user.length === 0){
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        await connection.end();

        const isMatched = await bcrypt.compare(password, user[0].password);
        if(!isMatched){
            return res.status(400).json({ success: false, message: 'Invalid email or password '});
        }
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        return res.status(200).json({
            success: true,
            message: 'User login successful',
            data: {
                token: token,
                name: user[0].name,
                email: user[0].email,
                avatar: user[0].avatar,
                created_on: user[0].created_on,
                updated_on: user[0].updated_on,
            }
        })
    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}