import { getConnection } from "../config/mysql.js";
import { deleteUserFromId, getUserFromEmail, getUserFromId, updateUserFromId } from "../query/users.js";
import { isValidEmail } from '../rules/users.js'

export const getUser = async (req, res) => {
    let connection, existingUsers;

    try {
        const { id } = req.params;
        connection = await getConnection();

        [existingUsers] = await connection.execute(getUserFromId, [id]);
        if (existingUsers.length === 0) {
            return res.status(404).json({ success: false, message: 'User not Found' });
        }
        const user = existingUsers[0];

        return res.status(200).json({
            success: true,
            message: 'User Profile',
            data: {
                user: user,
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

export const updateUser = async (req, res) => {
    let connection, existingUsers;

    try {
        const { id } = req.params;
        const { first_name, last_name, email } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Provide a proper email address' });
        }

        connection = await getConnection();

        [existingUsers] = await connection.execute(getUserFromId, [id]);
        if (existingUsers.length === 0) {
            return res.status(404).json({ success: false, message: 'User not Found' });
        }

        [existingUsers] = await connection.execute(getUserFromEmail, [email]);
        if (existingUsers.length !== 0) {
            return res.status(404).json({ success: false, message: 'Email already available' });
        }

        await connection.execute(updateUserFromId, [first_name, last_name, email, id]);
        const [users] = await connection.execute(getUserFromId, [id]);
        const user = users[0];

        return res.status(200).json({
            success: true,
            message: 'User details updated',
            data: {
                user: user,
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

export const deleteUser = async (req, res) => {
    let connection, existingUsers;

    try {
        const { id } = req.params;

        connection = await getConnection();

        [existingUsers] = await connection.execute(getUserFromId, [id]);
        if (existingUsers.length === 0) {
            return res.status(404).json({ success: false, message: 'User not Found' });
        }

        [existingUsers] = await connection.execute(deleteUserFromId, [id]);

        return res.status(200).json({ success: true, message: 'User deleted' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}