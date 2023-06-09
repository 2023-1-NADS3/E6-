import { IncomingMessage, ServerResponse, createServer  } from 'node:http'
import path from 'node:path'
import url from 'node:url'
import querystring from 'node:querystring'
require('dotenv').config();



const MAX_REQUEST_SIZE = 1024;


import { Mongo } from './Database/Mongo';
import { RedisMock } from './Database/Redis/mock';

export const mongo = new Mongo();
export const redis = new RedisMock();

import {AppointmentCache, OrderCache, OngCache, InMemoryCounter} from './Cache/index'
import { POST } from './Routes/POST';
import { GET } from './Routes/GET';
export const inMemoryCounter = new InMemoryCounter();
export const appointmentCache = new AppointmentCache(inMemoryCounter)
export const orderCache = new OrderCache(inMemoryCounter)
export const ongCache = new OngCache(inMemoryCounter)

import {runScenario } from './Test/setUpDb'

// setTimeout(() => {
//     runScenario()
// }, 6000);

createServer(async (req: IncomingMessage, res: ServerResponse) => {
    
    res.setHeader('Access-Control-Allow-Origin', `${process.env.ORIGIN}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');

    const METHOD = req.method;
    if (!req.url) {
        res.writeHead(403, {'Content-Type': 'text/plain'});
        return res.end('No url specified in request');
    }
    const parsedUrl = url.parse(req.url);
    const xForwardedFor = req.headers['x-forwarded-for'];
    // console.log('ipaddress: ' + xForwardedFor)
    const URL = parsedUrl.pathname;
    console.log(URL)
    console.log(URL?.substring(0,10))

    if (METHOD === 'POST') {
        const contentLength = req.headers['content-length']
        const valid_size = validateHeaderContentSize(contentLength)
        if (!valid_size) {
            res.writeHead(404,{'Content-Type': 'text/plain'})
            return res.end('provided body is too long')
        }
        try {
            const body = await getBody(req)
            if (!body) {
                res.writeHead(403, { 'Content-Type': 'text/plain' })
                console.log('no body provided')
                return res.end('No body provided')
            } else {
                if (URL === '/createorder') POST.createOrder(req, res, body);
                else if (URL === '/makeappointment') POST.makeAppointment(req, res, body);
                else if (URL === '/account/register/ONG') POST.registerOng(req, res, body);
                else if (URL === '/account/register/user') POST.registerUser(req, res, body);
                else if (URL === '/account/login/default') POST.loginZeroWaste(req, res, body);
                else if (URL === '/account/resetpassword') POST.resetPassword(req, res, body);
                    
                else if (URL === '/viewDonations') POST.viewDonations(req, res, body);
                    
                else if (URL === '/getMyLikesOngInfo') POST.getOngsInfoBasedOnIdsForLikes(req, res, body);
                    
                else if (URL === '/testpost') {
                    POST.testpost(req, res);
                }
                else {
                    console.log('route not found')
                    res.writeHead(405, {'Content-Type': 'text/plain'});
                    return res.end('Route does not exist'); //TODO: 404 ADD PAGE
                }
  
                // else if (URL === '/donation/requestdonation') POST.requestDonation(req,res, body)
                // else if (URL === '/donation/donate') POST.donate(req,res, body)
            }
        } catch (err) {
            console.log('catching' + err)
            res.writeHead(403, {'Content-Type': 'text/plain'});
            return res.end('no body provided or bad formated');
        }
    }


    else if (METHOD === 'GET') {
        // const body = await getBody(req)
        // if (body) {
        //     res.writeHead(403, {'Content-Type': 'text/plain'});
        //     return res.end('No need to specify data in the body');
        // }

        
        
        if (URL === '/getFive') GET.getDonationsPack(req.url, res) // donations
        else if (URL === '/get/favorites') GET.getFavorites(req, res)
        else if (URL === '/testget') GET.testget(req, res)
        // else if (URL === '/oauth') GET.loginOAuth(req,res)
        // else if (URL === '/account/login/oauth/oauth2callback') GET.OAuthCallBack(req,res)
        else if (URL === '/account/register/authentication/mfa') GET.registerValidation(req.url, res)
        else if (URL === '/profileinfo') GET.profile(req, res)
        // else if (URL === '/favorites') GET.addFavorite(req,res)
            
        // my profile info
        else if (URL === '/getMyInfo') GET.getMyInfo(req, res)

        //Ongs
        else if (URL === '/gettenongs') GET.getOngsPack(req.url, res)
        
        // Orders
        else if (URL === '/getordersfrom') GET.getOrdersFromAnOng(req.url, res)
        else if (URL === '/getactiveordersfrom') GET.getActiveOrdersFromAnOng(req.url, res)
        else if (URL === '/getorderandtime') GET.getSingleOrderAndOngTime(req, res)
        else if (URL === '/gettenorders') GET.getOrdersPack(req.url, res)
        else if (URL === '/myorders') GET.getMyOrders(req, res)
        else if (URL === '/myactiveorders') GET.getMyActiveOrders(req, res)
        else if (URL === '/gettwolastorders') GET.retrieveLastTwoOrders(res)
        
        // Appointments
        else if (URL === '/myappointments') GET.getMyAppointments(req, res)
        else if (URL === '/myactiveappointments') GET.getMyActiveAppointments(req, res)
        else if (URL === '/delete/myappointment') GET.deleteMyAppointment(req, res)
        else if (URL === '/getAppointmentsFromMyOrder') GET.getAppointmentsFromMyOrder(req, res)
            
        // Likes
        else if (URL === '/delete/favorites') GET.deleteFavorite(req,res)
        else if (URL === '/like') GET.likeOrder(req,res)
        else if (URL === '/unlike') GET.unlikeOrder(req, res)
        else if (URL === '/mylikedposts') GET.getMyLikedPosts(req, res)
        else if (URL === '/mylikes') GET.getMyLikes(req, res)
        else if (URL === '/mostlikedongs') GET.getMostLikedOngs(req, res)
            
            
        else if (URL === '/ongs') GET.getOng(req, res) // public
        


        else if (URL === '/getFiveUsers') GET.getDonationsPack(req.url, res) // donations
        else if (URL === '/userswhodonatedtospecificorder') GET.userswhodonatedtospecificorder(req, res)
       
        // my donations
        else if (URL === '/confirmdonation') GET.confirmDonation(req, res);
        else if (URL === '/getmydonations') GET.getmydonations(req, res);
     
        // else if (URL === '/mydonations') GET.myDonations(req, res);
        else if (URL === '/generatePDF') GET.getMyPdf(req, res)
        else if (URL?.substring(0, 11) === '/filesystem' || URL?.substring(0, 12) === '/filesystem/') GET.fileSystem(req, res)
        
       
        else {
            console.log('route not found')
            res.writeHead(403, {'Content-Type': 'text/plain'});
            return res.end('Route does not exist'); //TODO: 404 ADD PAGE
        }
        
    }

    // res.end();
    

    
}).listen(process.env.PORT, () => console.log('Listening'))


async function getBody(req: IncomingMessage) {
    return new Promise((resolve, reject) => { 
        let body = '';
        console.log('running  get body')
        req.on('data', (chunk: any) => {
            console.log('chunk' + chunk)
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject()
            }
        })
    })
}

function validateHeaderContentSize(contentLength?: string): boolean {
    try {
        if (!contentLength) return false;
        if (Number(contentLength) < MAX_REQUEST_SIZE) return true;
        return false;
    } catch (err) {
        console.log('err measuring body size' + err)
        return false;
    }
}




