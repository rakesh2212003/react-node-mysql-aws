import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3Client } from "../config/s3Client.js"

export const getObject = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 604800  }); //7 days
    return url;
};