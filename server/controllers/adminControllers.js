import { getConnection } from '../config/mysql.js'
import { getAllusers } from '../query/users.js'

export const getAllUsers = async(req, res) => {
    let connection;

    try{
        connection = await getConnection();

        const [users] = connection.execute(getAllusers);
        if(users.length === 0){
            return res.status(400).json({ success: false, message: 'User list empty' });
        }
        
        return res.status(200).json({
            success: true,
            message: 'User list empty',
            data:{
                users
            }
        });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }finally{
        if(connection){
            await connection.end();
        }
    }
}