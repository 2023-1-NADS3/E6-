import { ObjectId } from 'mongodb';
import { createClient } from 'redis';
import NodeCache from 'node-cache'
const myCache = new NodeCache();
const myEmailCache = new NodeCache();
const burnedCodePaths = new NodeCache();


export class RedisMock {
    private client: any;
    private data: any[];
    private favorites: any[];
    private likes: any[];

    constructor() {
        this.start()
        this.data = []
        this.favorites = []
        this.likes = []
    }

    public async start() {
        console.log('Using Redis Mock')
    }

    async storeVerification(code_path: string, entity: any): Promise<any | null> {
        myCache.set(code_path, JSON.stringify({ ...entity, used: false }), 90);
        myCache.set(entity.email, JSON.stringify({ time: 0 }), 90); 
        return true;
    }
    
    async getVerificationBasedOnEmail(email: string) {
        return await myCache.get(email)
        // if (!found) {
        //     return false;
        // }
        // const foundParsed = JSON.parse(found)
        // if (foundParsed.time == 2) {
        //     return false;
        // }
        // myCache.set(email, JSON.stringify({time: foundParsed.time++}), 90)
        // return true;
    }

    async getVerification(code_path: string): Promise<any | null> {
        return await myCache.get(code_path);
    }

    async burnCodePath(code_path: string): Promise<any | null> {
        burnedCodePaths.set(code_path, JSON.stringify({ burned: true }))
        return true;
    }

    async getBurnedCodePath(code_path: string): Promise<any | null> {
        return burnedCodePaths.get(code_path)
    }

    async storeTokenAsCache(token: string, token_info: string) {
        try {
            this.data.push({ key: token, value: token_info });
            return true;
        } catch (err) {
            return null;
        }
    }

    async getTokenAsCache(token: string) {
        try {
            const found_token = this.data.find((item) => { return item.key === token })
            if (found_token) return found_token.value
            return null;
        } catch (err) {
            return null;
        }
    }

    async storeFavorite(user_id: string, ong: {name: string, id: string}) {
        try {
            // this.favorites.push({ key: `user:${user}:likes:`, value: order })
            const data = {
                _id: user_id,
                ong: {
                    name: ong.name,
                    id: ong.id
                }
            }
            this.favorites.push({ key: user_id, value: data })
            console.log('stored favorites' + JSON.stringify(this.favorites))
            return true;
        } catch (err) {
            return null;
        }
    }
    async deleteFavorite(user: any, order: any) {
        try {
            
            console.log('\n \n user ' + user)
            console.log('\n \n orderid ' + order._id)
            
            // console.log('deleted favorites ' + this.favorites[0].value._id)
            // this.favorites = this.favorites.filter((item) => !(item.key === `user:${user}:likes:` && item.value._id === order._id))
            // this.favorites = this.favorites.filter((item) =>  item.value._id.toString() != order._id.toString() )
            this.favorites = this.favorites.filter((item) => {
                console.log('----------------------')
                console.log(item.value._id.toString())
                console.log(order._id.toString())
                console.log('----------------------')
                return item.value._id.toString() != order._id.toString()
            })
            console.log('\n \n favorites ' + JSON.stringify(this.favorites))
            return true;
        } catch (err) {
            return null;
        }
    }
    async findFavorite(user: any, order: any) {
        try {
            console.log('order' + JSON.stringify(order))
            // const fav_found = this.favorites.find((item) => (item.key == `user:${user}:likes:` && item.value._id == order._id) )
            const fav_found = this.favorites.find((item) => (item.key == `user:${user}:likes:` && item.value._id == order._id))
            console.log('\n \n \n found ' + fav_found)
            if (fav_found) return true;
            return null;
        } catch (err) {
            return null;
        }
    }

    async getFavorites(user_id: any) {
        try {
            const fav_founds = this.favorites.filter(item => item.key === `user:${user_id}:likes:`);
            return fav_founds
        } catch (err) {
            return [];
        }
    }

    async storeGoogleSession(access_token: string, data: any): Promise<any | null> {
        try {
            this.data.push({ key: access_token, value: data })
            return true;
        } catch (err) {
            return null;
        }
    }

    async deleteVerification(key: string): Promise<any | null> {
        try {
            this.data = this.data.filter((item) => { return item.key !== key })
            return true;
        } catch (err) {
            return null;
        }
    }

    async getGoogleSession(access_token: string): Promise<any | null> {
        try {
            const token = this.data.find((item) => { item.key === access_token })
            if (token) return token;
            return null;
        } catch (err) {
            return null;
        }
    }

    async storeLikeIfNotFound(user_id: string, ong_id: string) {
        const like = {
            user_id,
            ong_id,
        }
        const foundLike = this.likes.find(l => (l.user_id === like.user_id && l.ong_id === ong_id))
        if (!foundLike) {
            this.likes.push(like);
        }
    }

    async getMostLikedOngs() { // four most liked
       // Count likes for each ong_id
        const likeCountMap = this.likes.reduce((acc, obj) => {
            const ongId = obj.ong_id;
            acc[ongId] = (acc[ongId] || 0) + 1;
            return acc;
        }, {});
        
        // Get the four most liked ong_id values
        const sortedOngIds = Object.keys(likeCountMap)
            .sort((a, b) => likeCountMap[b] - likeCountMap[a])
            .slice(0, 4);
        
        // Count likes only for the four most liked ong_id values
        const topLikeCountMap = sortedOngIds.reduce((acc: any, ongId: any) => {
            acc[ongId] = likeCountMap[ongId];
            return acc;
        }, {});
        return topLikeCountMap;
    }
    async deleteLikeIfFound(user_id: string, ong_id: string) {
        this.likes = this.likes.filter(l => !(l.user_id === user_id && l.ong_id === ong_id));
        console.log('deleted')
        console.log(this.likes)
        
    }
    async getLikesOfMultipleOngs(ongs: any[]) { //FROM ORDER ID
        console.log(ongs)
        try {
            const ongLikes = ongs.reduce((acc, ongs) => {
                const id = ongs._id.toString();
                const count = this.likes.filter((like) => like.ong_id.toString() === id).length;
                acc[id] = count;
                return acc;
              }, {});
              console.log('ongLikes');
              console.log(ongLikes);
              return ongLikes;

        } catch (err) {
            return [];
        }
    }
    async getMyLikes(user_id: any[]) { //FROM ORDER ID
        try {
            const my_likes = this.likes.filter(l => {return l.user_id === user_id})
            return my_likes;
        } catch (err) {
            return [];
        }
    }

    // async querySession(sessionId) {
    //     return await this.client.get(sessionId);
    // }

    // async storeMessage({ id, from, to, text}) {
    //     return await this.client.set(id,  JSON.stringify({ from, to, text }));
    // }


}



