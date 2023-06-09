import { createClient } from 'redis';



export class Redis{
    private client: any;

    constructor() {
        try {   
            (async () => { 
                this.client = createClient();
            
                this.client.on('connect', function() {
                    console.log('Redis client connected');
                });
                await this.start();
            })()
        } catch (err) {
            console.log('RedisError: ' + err)
        }
    }
    
    public async start() {
        await this.client.connect();
        console.log('Connected to Redis')
        this.client.on('error', (err: Error) => console.log('Redis Client Error', err));
    }

    // const session = {
    //     userId: uuidv4(),
    //     loginTime: now(),
    //     ipAddress: ip,
    //     SessionId: uuidv4()
    // }
    // async storeSession(session) {
    //     await this.client.set(session.SessionId, JSON.stringify(session), {EX: 60 * 15}); // 15min
    // }

    // async storeVerification(code_path: string, code: string, entity: any) {
    //     await this.client.set(code_path, JSON.stringify({ code, entity}), {EX: 60 * 2}); // 10 min
    // }
    async storeVerification(code_path: string, entity: any): Promise<any | null> {
        try {
            return await this.client.set(code_path, JSON.stringify(entity), {EX: 60 * 10}); // 10 min
        } catch (err) {
            return null;
        }
    }

    async storeTokenAsCache(token: string, token_info: string) {
        try {
            return await this.client.set(token, JSON.stringify(token_info), {EX: 60 * 30}); // 30 min
        } catch (err) {
            return null;
        }
    }

    async storeFavorite(token: string, token_info: string) {
        // try {
        //     return await this.client.set(token, JSON.stringify(token_info), {EX: 60 * 30}); // 30 min
        // } catch (err) {
        //     return null;
        // }
    }
    async deleteFavorite(token: string, token_info: string) {
        // try {
        //     return await this.client.set(token, JSON.stringify(token_info), {EX: 60 * 30}); // 30 min
        // } catch (err) {
        //     return null;
        // }
    }
    async findFavorite(token: string, token_info: string) {
        // try {
        //     return await this.client.set(token, JSON.stringify(token_info), {EX: 60 * 30}); // 30 min
        // } catch (err) {
        //     return null;
        // }
    }

    async getFavorites(user_id: any) {
     
    }

    async storeLike(user_id: string, order_id: string){

    }

    async deleteLikeIfFound(user_id: string, order_id: string){}

    async storeGoogleSession(access_token: string, data: any): Promise<any | null> {
        try {
            return await this.client.set(access_token, JSON.stringify(data)); // 10 min
        } catch (err) {
            return null;
        }
    }

    async deleteVerification(key: string): Promise<any | null> {
        try {
            return await this.client.del(key);
        } catch (err) {
            return null;
        }
    }

    async getVerification(code_path: string): Promise<any | null> {
        try {
            
            const code_user = await this.client.get(code_path);
            if (code_user) {
                return JSON.parse(code_user)
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    async getGoogleSession(access_token: string): Promise<any | null> {
        try {
            
            const token = await this.client.get(access_token);
            if (token) {
                return JSON.parse(token)
            }
            return null;
        } catch (err) {
            return null;
        }
    }


    async publishMessage() {
        console.log('sending message')
        try {
            
            const userData = { name: 'guilherme', age: 28 };
            await this.client.publish('mychannel', JSON.stringify(userData))
        } catch (err) {
            console.log(err)
        }
    }

    // async querySession(sessionId) {
    //     return await this.client.get(sessionId);
    // }

    // async storeMessage({ id, from, to, text}) {
    //     return await this.client.set(id,  JSON.stringify({ from, to, text }));
    // }


}



