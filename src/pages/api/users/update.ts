import type { NextApiRequest, NextApiResponse } from "next";
import executeStoredProc from "@/lib/db";
import { updateUser } from "@/lib/procedures";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'POST') return response.status(405).end();

    try{
        const { name, params } = updateUser;

        const inputParams = params.map((param) => ({
            ...param,
            value: request.body[param.name],
        }));

        const result = await executeStoredProc(name, inputParams);
        response.status(200).json(result.recordset || {success: true });
    } catch(error) {
        response.status(500).json({ error: 'Failed to update user' });
    }
};