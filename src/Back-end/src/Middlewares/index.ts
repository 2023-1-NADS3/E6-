import { IncomingMessage, ServerResponse } from "http";
import jwt from 'jsonwebtoken'
import { redis } from "..";
import 'dotenv/config'

export async function AccessTokenVerification(req: IncomingMessage, res: ServerResponse, callback: (decoded: string) => void) {
  try {
      
      const cookies: any = {}
   
      if (!req.headers.cookie) { 
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('Not authorized');
      }
  
      req.headers.cookie.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = parts[1].trim();
      });
  
      const accessToken = cookies.access_token;
   
     
    if (!accessToken) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('Not authorized');
      }
      
      const token = accessToken.split(' ')
      const token_type = token[0] // gogle or jwt
      const token_value = token[1];
  
      if (token_type === 'Google') {
        const data: any = redis.getGoogleSession(token_value)
        if (!data) {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          return res.end('Not authorized');
        }
        callback({...data, type: 'user'})
          
      } else if (token_type === 'Bearer') {
    
        
        const is_token_cached = await redis.getTokenAsCache(token_value);
        if (is_token_cached) {
          return callback(is_token_cached);
        }
  
      jwt.verify(token_value, `${process.env.JWT}`, { algorithms: ['HS256'] },async (err: any, decoded: any) => {
        if (err) {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          return res.end('Not authorized');
        } else {
          if (decoded) {
            await redis.storeTokenAsCache(token_value, decoded)
            callback(decoded)
          } else {
              res.writeHead(401, { 'Content-Type': 'text/plain' });
              return res.end('Not authorized');
            }
          }
        })
  
      } else {
        return res.end('Not authorized');
      }
      
  
    } catch (err) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      return res.end('Not authorized');
    }
}
  





export async function webSocketTokenVeritification (req: IncomingMessage, callback: (decoded: string) => void) {
  try {
      const cookies: any = {};

      if (!req.headers.cookie) { 
          return null;
      }
  
      req.headers.cookie.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = parts[1].trim();
      });
  
      const accessToken = cookies.access_token;
   
     
      if (!accessToken) {
        return null
      }
      
      const token = accessToken.split(' ')
      const token_type = token[0] // gogle or jwt
      const token_value = token[1];
  
      if (token_type === 'Google') {
        const data: any = redis.getGoogleSession(token_value)
        if (!data) {
            return null;
        }
        callback({...data, type: 'user'})
          
      } else if (token_type === 'Bearer') {
    
        
        const is_token_cached = await redis.getTokenAsCache(token_value);
        if (is_token_cached) {
          return callback(is_token_cached);
        }
  
        jwt.verify(token_value, `${process.env.JWT}`, { algorithms: ['HS256'] },async (err: any, decoded: any) => {
          if (err) {
            return null;
          } else {
            if (decoded) {
              await redis.storeTokenAsCache(token_value, decoded)
              callback(decoded)
            } else {
              return null
            }
          }
        })
  
      } else {
        return null
      }
      
  
    } catch (err) {
    return null;
    }
}