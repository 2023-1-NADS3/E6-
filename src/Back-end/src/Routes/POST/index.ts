import { IncomingMessage , ServerResponse } from 'http'
import { ObjectId, OrderedBulkOperation } from 'mongodb';



import { GenerateLinkCode } from '../../Utils/generateLink';
import { Worker  } from 'worker_threads';
import { inMemoryCounter, redis } from '../..';
import url from 'node:url'
import querystring from 'node:querystring'

import { MyDate } from '../../Utils/MyDate';

import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { Sanitaze } from '../../Utils/sanitaze';
import { AccessTokenVerification } from '../../Middlewares';

import { mongo, appointmentCache, orderCache, ongCache } from '../../index'


import {cachedOrderesForFavorites, OutputtedOng, OutputtedOrder} from '../../Cache/index'
// import { oauth2Client, scopes } from '../../OAuth/google'

export const donated = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

const testpost = async (req: IncomingMessage, res: ServerResponse) => { 
 
  res.writeHead(303, { 'Content-Type': 'text/plain', 'location': 'http://localhost:3000/testget' });
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  return res.end('ok')
}


const viewDonations = async (req: IncomingMessage, res: ServerResponse, body: any) => { 
  AccessTokenVerification(req, res, async (decoded: any) => { 
    const worked = await mongo.viewAppointments(body?.ids, decoded.id)
    if (worked) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end()
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end()

  })

}


const createOrder = async (req: IncomingMessage, res: ServerResponse, body: any) => {
  AccessTokenVerification(req, res, async (decoded: any) => {

    const isError = Sanitaze.sanitazeOrder2(body)
    if (isError) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Error Sanitazing: ' + isError)
    }

    if (decoded.type !== 'ong') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Only ONG accounts can request for donations')
    }

    let total_of_zeros = 0
    for (let i = 0; i < body.items.length; i++) { 
      if (body.items[i] === 0) total_of_zeros++;
    }
    if (total_of_zeros === body.items.length) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('You must provide at least one item to be donated');
    }

    const mongo_object_id = new ObjectId(decoded.id)
    const foundOng = await mongo.findOneOngById(decoded.id)
    if (!foundOng) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      console.log('ong not found')
      return res.end('ONG not found')
    }
   
    const foundOrders: any | null = await mongo.findAllActiveCompanyOrdersById(decoded.id)
    if (foundOrders?.length > 2) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Ongs can only have two active Donations')
    }
    

    body.expires_in = MyDate.getFutureDate(body.expires_in)

    const inserted_id = await orderCache.insertOrder({ ...body, donated, created_at: MyDate.getCurrentDateAndTime(), owner: mongo_object_id })

    if (!inserted_id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Unexpected Error while inserting')
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('order requested, id: ' + inserted_id)
  })
 }




const getOngsInfoBasedOnIdsForLikes = async (req: IncomingMessage, res: ServerResponse, body: any) => {
  if (!body.ids) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Error Sanitazing: No ongs ids list provided')
  }
  try {
    body.ids.forEach((item: any) => {
      const isError = Sanitaze.sanitazeMongoId(item)
      if (isError) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Error Sanitazing: ' + isError)
      }
    })
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Error Sanitazing: ' + err)
  }

  const ongs = await mongo.getManyOngsInfoBasedOnId(body.ids)

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(ongs))
    
  
}



 

const registerUser = async (req: IncomingMessage, res: ServerResponse, body: any) => {
  const isError = Sanitaze.sanitazeUser(body)
    if (isError) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Error Sanitazing: ' + isError)
  }
  const UserOrOngFound = await mongo.findOneOngOrUserWhereOR(body);
  if (UserOrOngFound) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Entity already exists')
  }
  const path = GenerateLinkCode.generatePath()
  const saved = await redis.storeVerification(path, { ...body, type: 'user', xp: 0 });
  if (!saved) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Error while saving your log')
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  return res.end(`We will sent an email with a verification link \n ${path}`) // TODO: Sent an email
};


const registerOng = async (req: IncomingMessage, res: ServerResponse, body: any) => {
  const isError = Sanitaze.sanitazeOng(body)
    if (isError) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Error Sanitazing: ' + isError)
  }

  if (body.password !== body.confirm_password) { 
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Senhas não correspondem')
  }

  const UserOrOngFound = await mongo.findOneOngOrUserWhereOR(body);
  if (UserOrOngFound) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Email already exists')
  }

  const verification: any | null = await redis.getVerificationBasedOnEmail(body.email)
  if (!verification) {
    
    const path = GenerateLinkCode.generatePath()
    const saved = await redis.storeVerification(path, { ...body, type: 'ong', xp: 0 })
    if (!saved) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Error while saving your log')
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(`We will sent an email with a verification link \n ${path}`)
    return res.end(`We will sent an email with a verification link \n ${path}`) // TODO: Sent an email
  } 
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  return res.end('You ordered emails two times already... wait 90 seconds')
};


// const requestDonation = async (req: IncomingMessage, res: ServerResponse, body: any) => {
//   AccessTokenVerification(req, res, async (decoded: any) => { 

//     const isError = Sanitaze.sanitazeOrder(body)
//     if (isError) {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       return res.end('Error Sanitazing: ' + isError)
//     }

//     if (body.min > body.max) {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       return res.end('Minimum value can not be greater than max')
//     }

//     if (decoded.type !== 'ong') {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       return res.end('Only ONG accounts can request for donations')
//     }

//     const found = await mongo.findOneOng({ _id: new ObjectId(decoded.id) })
    
//     if (!found) {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       return res.end('Company not found')
//     }

//     body.expires_in = MyDate.getFutureDate(body.expires_in)
//     const inserted_id = await mongo.insertOneOrder({ ...body, donated: 0, created_at: MyDate.getCurrentDateAndTime(), owner: decoded.id });
//     if (!inserted_id) {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       return res.end('Unexpected Error while inserting')
//     }
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     return res.end('order requested, id: ' + inserted_id)
//   })
// }


const loginZeroWaste = async (req: IncomingMessage, res: ServerResponse, body: any) => {

  const isError = Sanitaze.sanitazeLoginInfo(body)
    if (isError) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Error Sanitazing: ' + isError)
  }
  
  // const foundEntity = await mongo.findOneOngOrUserWhereOR({ email: body.email, cnpj: '', phone: '' });
  const foundEntity = await mongo.findOneOngOrUserWhereOR({ email: body.email });

  if (!foundEntity) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Account does not exist')
  }
  
  if (body.password !== foundEntity.password) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Passwords does not match')
  }

  const token = jwt.sign({
    id: foundEntity._id.toString(),
    name: foundEntity.name,
    type: foundEntity.type,
    auth_type: 'zero-waste'
  }, `${process.env.JWT}`, {
    // expiresIn: '40s',
    algorithm: 'HS256'
  });
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Authorization', `Bearer ${token}`)
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
  const user_info = {
    id: foundEntity._id,
    type: foundEntity.type,
    name: foundEntity.name,
    image: 'panda.png',
    email: foundEntity.email
  }

  const cookie1 = `access_token=Bearer ${token}; Path=/; Expires=${expires.toUTCString()}`
  const cookie2 = `user=${JSON.stringify(user_info)}; Path=/; Expires=${expires.toUTCString()}`
  res.setHeader('Set-Cookie', [cookie1, cookie2]);
  res.statusCode = 200;
  return res.end(JSON.stringify({ ...user_info, email: null}));
};

const resetPassword = (req: IncomingMessage, res: ServerResponse, body: any) => {
  res.writeHead(200, 'resetpassword');
  res.write('resetpassword')
};

const makeAppointment = async (req: IncomingMessage, res: ServerResponse, body: any) => {
  AccessTokenVerification(req, res, async (decoded: any) => {
    
 
      if (decoded.type !== 'user') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('only users can make appointmnets')
      }

      const isError = Sanitaze.sanitazeAppointment(body)
      if (isError) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Error Sanitazing: ' + isError)
    }
    
      const appointment = await appointmentCache.getAppointmentByUserIDAndOrderID(decoded.id, body.order_parent_id)
      if (appointment && !appointment?.confirmed) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('You have done an appointment to this order already')
      }

    
    
      // Check if the user has more than two active appointments 
    const user_appointments: any | null = await mongo.findActiveAppointmentsFromUserId(decoded.id);
    
    if (user_appointments?.length > 2) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Users can only have two active appointments')
    }
 
      const foundOrder: OutputtedOrder | null = await orderCache.getOrderById(body.order_parent_id)
      if (!foundOrder) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Order not found')
    }
    
    if (foundOrder?.over) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Order already completed')
    }

    let err;
    let zero_items_count = 0;
    for (let i = 0; i < donated.length; i++){
      if (body.items[i] > (foundOrder.items[i] - foundOrder.donated[i])) {
        err = true;
        break;
      }
      if (body.items[i] == 0) zero_items_count++
    }
    
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('the amount you are aiming to donate does not fit the missing values set by the ONG')
    }

    if (donated.length === zero_items_count) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Nenhuma quantidade foi submetida para o agendamento')
    }

    
      // const adjusted = validateItems(foundOrder.items, foundOrder.donated, body.items)
      // if (adjusted) {
      //   res.writeHead(404, { 'Content-Type': 'text/plain' });
      //   return res.end('The amount you want to contribute with is bigger than the missing for the donation')
      // }

      const foundOng: OutputtedOng | null = await ongCache.getOngById(foundOrder.owner.toString())
      if (!foundOng) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('ONG not found or has been deleted')
      }
      //nn:nn-nn:nn
      // const ong_worker_day_time = foundOng.working_time[`${body.day}`].split('-');

      // const open_hour = ong_worker_day_time[0].split(':');
      // const close_hour = ong_worker_day_time[1].split(':');

      // const appointment_time = body.time.split(':')
      // const appointment_hour = appointment_time[0]
    
      // if (appointment_hour < open_hour || appointment_hour > close_hour) {
      //   res.writeHead(404, { 'Content-Type': 'text/plain' });
      //   return res.end('Company work time does not fit in your appointment time or week day')
      // }
    


    const inserted = await appointmentCache.insertAppointment(
      { ong_parent_id: foundOng._id, user_parent_id: new ObjectId(decoded.id), ...body }
    )
      if (!inserted) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Failed for unexpected error')
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('ok')
    

  })
}

function validateItems(requested: number[], donated: number[], being_donated: number[]) {
  let adjusted;
  for (let i = 0; requested.length; i++){
      const missing: number = requested[i] - donated[i];
      if (being_donated[i] > missing) {
        being_donated[i] = missing;
        adjusted = true;
      }
  }
  if (adjusted) return being_donated;
  return;
}




export const POST = {
  registerOng,
  registerUser,
  loginZeroWaste,
  resetPassword,
  // requestDonation,
  createOrder,
  makeAppointment,
  testpost,
  viewDonations,
  getOngsInfoBasedOnIdsForLikes
}

