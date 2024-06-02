import { getConnection } from "../config/mysql.js";
import { deleteUserFromId, getAllUser } from "../query/user.js";

export const getAllusers = async (req, res) => {
    let connection;

    try {
        connection = await getConnection();
        const [allusers] = await connection.execute(getAllUser);

        return res.status(200).json({
            success: true,
            message: 'All user details',
            data: {
                allusers
            }
        })
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export const deleteUser = async (req, res) => {
    let connection;

    try {
        const { id } = req.params;

        connection = await getConnection();
        const [rows] = await connection.execute(deleteUserFromId, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not Found' });
        }

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