import { getConnection } from "../config/mysql.js";
import { getAllUser } from "../query/user.js";

export const getAllusers = async(req, res) => {
    try{
        const connection = await getConnection();
        const [allusers] = await connection.execute(getAllUser);
        await connection.end();

        return res.status(200).json({
            success: true,
            message: 'All user details',
            data: {
                allusers
            }
        })
    }catch(error){
        return res.status(400).json({ success: false, error: error.message });
    }
}