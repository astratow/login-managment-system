import * as sql from 'mssql';

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
    }
};

export async function executeStoredProc(   
    procName: string, 
    inputParams: { 
        name: string,
        type: sql.ISqlType, 
        value: any 
    }[] = []
) {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        inputParams.forEach(param => 
            request.input(param.name, param.type, param.value)
        );
        const result = await request.execute(procName);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await sql.close();
    }
}