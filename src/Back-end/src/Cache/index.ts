import { Mongo } from "../Database/Mongo"
import {mongo} from '../index'
import { ObjectId } from 'mongodb'



export const cachedOrderesForFavorites: any = [

]

export const cachedOngs: any = [

]


interface InMemoryOrders{
    owner_id: string;
    order_id: string 
}
interface InMemoryAppointments{
    user_id: string;
    appointment_id: string 
}
export class InMemoryCounter {
    public ordersFromSameOng: InMemoryOrders[] = []
    public appointmentsFromSameUser: InMemoryAppointments[] = []

    constructor() { }
    
    addOrder( owner_id: string, order_id: string ) {
        this.ordersFromSameOng.push({owner_id, order_id})
    }
    removeOrder() { }
    
    addAppointment(user_id: string, appointment_id: string) {
        this.appointmentsFromSameUser.push({user_id, appointment_id})
    }
    removeAppointment(){}


}




export const cachedUsersWhoDonatedAndDonatedItems: any = [

]

export interface BodyAppointment{
    // id: string
    order_parent_id: string;
    user_parent_id: ObjectId;
    ong_parent_id: ObjectId;
    day: string;
    time: string;
    items: any[];
    // confirmed: boolean;
}
export interface OutputtedAppointment{
    _id: ObjectId;
    user_parent_id: ObjectId;
    order_parent_id: ObjectId;
    ong_parent_id: ObjectId;
    day: string;
    time: string;
    items: any[];
    confirmed: boolean;

    order_parent?: any;
}
export class AppointmentCache{
    private appointments: OutputtedAppointment[] = []
    private appointments_from_same_user: OutputtedAppointment[] = []

    // constructor(private mongo: Mongo){}
    constructor(private inMemoryCounter: InMemoryCounter) {
        
    }

    async getAppointmentById(id: string): Promise<OutputtedAppointment | null> {
        // const cached = this.appointments.find((appointment: OutputtedAppointment) => appointment._id.toString() == id );
        // if (cached){
        //     return cached;
        // }
        const database: OutputtedAppointment | null = await mongo.findOneAppointmentById(id)
        if (database){
            this.appointments.push(database)
            return database;
        }
        return null;
    }

    async getAppointmentsFromUserId(id: string): Promise<OutputtedAppointment[] | null> {
        // const cached = this.appointments_from_same_user.filter((appointment: OutputtedAppointment) => appointment.user_parent_id.toString() === id );
        // if (cached.length > 0) {
        //     console.log('from cache')
        //     return cached;
        // }
        const database: OutputtedAppointment[] | null = await mongo.findAppointmentsFromUserId(id)
        if (database && database.length > 0){
            console.log('from db')
            // this.appointments_from_same_user.push(...database)
            // console.log(this.appointments_from_same_user)
            return database;
        }
        return null;
    }
    
    async getAppointmentByUserIDAndOrderID(user_parent_id: string, order_parent_id: string): Promise<OutputtedAppointment | null> {

        // const cached =
        //     this.appointments.find((appointment: OutputtedAppointment) => {
        //         appointment.user_parent_id.toString() == user_parent_id && appointment.order_parent_id.toString() == order_parent_id
        //     });
        // if (cached){
        //     return cached;
        // }
        const database = await mongo.findAppointmentByUserIDAndOrderID(user_parent_id, order_parent_id);
        if (database) {            
            return database;
        }
        return null;
    }

    async getAppointmentsFromOrder(order_id: string, ong_owner_id: string): Promise<OutputtedAppointment[] | null> {
        return await mongo.findAllAppointmentsFromOrder(order_id, ong_owner_id)
    }


    async insertAppointment(appointment: BodyAppointment) {
        const outputAppointment_id: ObjectId | null = await mongo.insertAppointment(appointment)
        if (outputAppointment_id) {
            const formated = {
                _id: outputAppointment_id,
                user_parent_id: new ObjectId(appointment.user_parent_id),
                order_parent_id: new ObjectId(appointment.order_parent_id),
                ong_parent_id: new ObjectId(appointment.order_parent_id),
                day: appointment.day,
                time: appointment.time,
                items: appointment.items,
                confirmed: false,
            }
            this.appointments.push(formated);
            this.inMemoryCounter.addAppointment(appointment.user_parent_id.toString(), outputAppointment_id.toString())
            return true;
        }
        return false;
    }

    async deleteAppointmentById(id: string){
        const cached = this.appointments.find((appointment: OutputtedAppointment) => { return appointment._id.toString() === id });
        console.log('cached1')
        console.log(cached)
        if (cached){
            this.appointments = this.appointments.filter((appointment: OutputtedAppointment) => appointment._id.toString() !== id.toString() 
            );
        }
        console.log('this.appointments')
        console.log(this.appointments)
        await mongo.deleteAppointmentById(id);
        return true;
    }

}




export interface BodyOrder{
    name: string;
    description: string;
    items: number[];
    donated: number[];
    expires_in: string;
    owner: string;
}

export interface OutputtedOrder{
    _id: ObjectId;
    name: string;
    description: string;
    items: number[];
    donated: number[];
    expires_in: string;
    owner: string;
    created_at: any;
    over?: boolean;
}

export class OrderCache{
    private orders: OutputtedOrder[] = []

    constructor(private inMemoryCounter: InMemoryCounter){}
        

    async insertOrder(order: BodyOrder): Promise<boolean>{
        const outputOrder: ObjectId | null = await mongo.insertOneOrder(order);
        if (outputOrder) {
            this.orders.push({ _id: outputOrder, ...order, created_at: '' });
            this.inMemoryCounter.addOrder(order.owner.toString(), outputOrder.toString() )
            return true;
        }
        return false;
    }

    async getOrderById(id: string): Promise<OutputtedOrder | null> {
        const cached = this.orders.find((order: OutputtedOrder) => order._id.toString() === id );
        if (cached){
            return cached;
        }
        const database: OutputtedOrder | null = await mongo.findOneOrderById(id)
        if (database){
            this.orders.push(database)
            return database;
        }
        return null;
    }
    async getOrderByOwnerId(id: string): Promise<OutputtedOrder[] | null> {
        // const cached = this.orders.filter((order: OutputtedOrder) => order.owner.toString() !== id );
        // if (cached){
        //     return cached;
        // }
        const database: OutputtedOrder[] | null = await mongo.findAllCompanyOrdersById(id)
        if (database){
            this.orders.push(...database)
            return database;
        }
        return null;
    }

    async updateOrderById(id: string, donated: number[]) {
        this.orders.forEach((order: OutputtedOrder) => {
            if (order._id.toString() === id) {
                order.donated.forEach((donation: number, index: number) => {
                    donation = donated[index];
                })
            }
        })
    }
}



interface WorkingTime{
    seg: string;
    ter: string;
    qua: string;
    qui: string;
    sex: string;
    sab: string;
    dom: string;
}

export interface BodyOng{
    // id: string
    user_parent_id: string;
    order_parent_id: string;
    ong_parent_id: string;
    day: string;
    working_time: any;
    items: any[];
    // confirmed: boolean;
}
export interface OutputtedOng{
    _id: ObjectId;
    user_parent_id: ObjectId;
    order_parent_id: ObjectId;
    ong_parent_id: ObjectId;
    day: string;
    working_time: any;
    items: any[];
    confirmed: boolean;
}
export class OngCache{
    private ongs: OutputtedOng[] = []

    constructor(private inMemoryCounter: InMemoryCounter){}

    async getOngById(id: string): Promise<OutputtedOng | null> {
        const cached = this.ongs.find((ong: OutputtedOng) => { return ong._id.toString() == id });
        if (cached){
            console.log('from cache')
            return cached;
        }
        const database: OutputtedOng | null = await mongo.findOneOngById(id)
        if (database){
            this.ongs.push(database)
            return database;
        }
        return null;
    }
}


