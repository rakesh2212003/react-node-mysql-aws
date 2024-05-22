import { getObject } from '../services/s3Operations.js'

export const test = async(req, res) => {
    const result = await getObject("00000000_0000.png");
    return res.status(200).json({ success: true, data: result });
}