import { promisify } from "node:util";
import { mongo } from "..";
import { MyDate } from "../Utils/MyDate";


function generateRandonValueBetween(min: number, max: number): number {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
}

const donated = {
    brinquedo: 0,
    conserva: 0,
    dinheiro: 0,
    leite: 0,
    livro: 0,
    oleo: 0,
    racao: 0,
  }

const names: any[] = [
    {
        name: 'Deodoro da Fonseca',
        email: `deodorodafonseca@gmail.com`
    },
    {
        name: 'Rodrigues Alves',
        email: `rodriguesalves@gmail.com`
    },
    {
        name: 'Guilherme Gavioli',
        email: `guilherme@gmail.com`
    },
    {
        name: 'Joao da Silva',
        email: `joao@gmail.com`
    },
    {
        name: 'Washington Luis',
        email: `washingtonluis@gmail.com`
    },
    {
        name: 'Humberto Castelo Branco',
        email: `humbertocastelobranco@gmail.com`
    },
    {
        name: "Deodoro da Fonseca",
        email: "deodoro.fonseca@presidency.gov.br"
      },
      {
        name: "Floriano Peixoto",
        email: "floriano.peixoto@presidency.gov.br"
      },
      {
        name: "Prudente de Morais",
        email: "prudente.morais@presidency.gov.br"
      },
      {
        name: "Campos Sales",
        email: "campos.sales@presidency.gov.br"
      },
      {
        name: "Rodrigues Alves",
        email: "rodrigues.alves@presidency.gov.br"
      },
      {
        name: "Afonso Pena",
        email: "afonso.pena@presidency.gov.br"
      },
      {
        name: "Nilo Peçanha",
        email: "nilo.pecanha@presidency.gov.br"
      },
      {
        name: "Hermes da Fonseca",
        email: "hermes.fonseca@presidency.gov.br"
      },
      {
        name: "Venceslau Brás",
        email: "venceslau.bras@presidency.gov.br"
      },
      {
        name: "Delfim Moreira",
        email: "delfim.moreira@presidency.gov.br"
      },
      {
        name: "Epitácio Pessoa",
        email: "epitacio.pessoa@presidency.gov.br"
      },
      {
        name: "Artur Bernardes",
        email: "artur.bernardes@presidency.gov.br"
      },
      {
        name: "Washington Luís",
        email: "washington.luis@presidency.gov.br"
      },
      {
        name: "Getúlio Vargas",
        email: "getulio.vargas@presidency.gov.br"
      },
      {
        name: "Café Filho",
        email: "cafe.filho@presidency.gov.br"
      },
      {
        name: "Juscelino Kubitschek",
        email: "jk@presidency.gov.br"
      },
      {
        name: "Jânio Quadros",
        email: "janio.quadros@presidency.gov.br"
      },
      {
        name: "João Goulart",
        email: "joao.goulart@presidency.gov.br"
      },
    {
        name: "Castelo Branco",
        email: "castelo.branco@presidency.gov.br"
    }
]

export const ong_names: any[] = [{
    id: null,
    name: 'redepalladium',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Irmandade de Aco',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'A armada de dumblodore',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Coracao de Itrio',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
    },
{
    id: null,
    name: 'Visao Mundial I',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial II',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial III',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial IV',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial V',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial VI',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial VII',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial VIII',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial IX',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial X',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial XI',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial XII',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial XIII',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial XIV',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial XV',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial XVII',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial 17',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial 18',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial 19',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
{
    id: null,
    name: 'Visao Mundial 20',
    working_time: {
        seg: '00:00-00:00',
        ter: '14:00-20:00',
        qua: '14:00-20:00',
        qui: '14:00-20:00',
        sex: '09:00-18:30',
        sab: '11:15-20:25',
        dom: '00:00-00:00',
    },
    orders: [],
    donations: [],
},
]

const Ongdescription = 'Somos um Instituto comprometido em ajudar pessoas que passam necessidade, através do acolhimento dessas pessoas e fornecimento de mantimentos, moradia e oportunidades para que elas possam mudar de vida. Como educação e emprego. Nosso objetivo é ajudar um numero cada vez maior de pessoas possiveis.'


export async function insertUsers(): Promise<void> {
    return new Promise((resolve, rej): void => {

        for (let i =0; i < names.length; i++){
            const user: any = {
                name: names[i].name,
                email: names[i].email,
            phone: `${generateRandonValueBetween(10000000000, 99999999999)}`,
            xp: generateRandonValueBetween(20, 200),
            password: `123456789`,
            address: 'Praça dos tres Poderes',
            address_state: 'DF',
            address_number: '430',
            
            type: 'user',
            created_at: MyDate.getCurrentDateAndTime()
        };
        (async ()=>{
            await mongo.insertOneUser({  ...user  })
        })()
        }
        resolve()
    })
}


export async function insertOngs(): Promise<void> {
    return new Promise(async (resolve, rej): Promise<void> => { 
    for (let i =0; i < ong_names.length; i++){
        const ong: any = {
            name: ong_names[i].name,
            phone: `${generateRandonValueBetween(10000000000, 99999999999)}`,
            cpnj: `${generateRandonValueBetween(10000000000000, 99999999999999)}`,
            email: `${ong_names[i].name.toString().toLowerCase().replace(/\s/g, '')}@gmail.com`,
            working_time: ong_names[i].working_time,
            description: Ongdescription,
            password: `123456789`,

            address_street: 'Praca da Lisboa',
            address_state: 'SP',
            // address_city: 'SP',
            address_number: '1092',

            type: 'ong',
            created_at: MyDate.getCurrentDateAndTime()
        };
        const ong_id = await mongo.insertOneOng({ ...ong })
        ong_names[i].id = ong_id
        }
        setTimeout(() => {
            resolve()
        }, 3000);
    })
}

export async function insertOrders(): Promise<void> {
    return new Promise((resolve, rej): void => { 
    for (let i = 0; i < 50; i++){
        const items = {
            conserva: 150,
            brinquedo: 150,
            dinheiro: 150,
            livro: 150,
            racao: 150,
            leite: 150,
            oleo: 150,
        }

        const i2 = [
            150,150,150,150,150,150,150
        ]
        const d2 = [
            0,0,0,0,0,0,0
        ]
        
        const random = generateRandonValueBetween(0, ong_names.length - 1)
        
        const order: any = {
            name: `Shelter for All ${i}`,
            description: 'Help our ONG in providing food for the homeless! Donate now to our food drive and make a difference in the lives of those in need. Thank you!',
            items: i2, 
            donated: d2,
          expires_in: 'threemonths',
          created_at: MyDate.getCurrentDateAndTime(),
          owner: ong_names[random].id // random owner
      };
  
      (async ()=>{
          const order_id = await mongo.insertOneOrder({ ...order });
          console.log(order_id)
          const fullorder = {
              ...order,
              id: order_id
          }

          ong_names[random].orders.push(fullorder);
         
      })()
        }
        resolve()
    })
} 

export async function insertDonations(): Promise<void> {
    return new Promise((resolve, rej): void => {
    for (let i = 0; i < 50; i++){
        const random = generateRandonValueBetween(0, ong_names.length - 1)
        const random_names = generateRandonValueBetween(0, names.length - 1)
        const ongdata = ong_names[random]
        const donation: any = {
            order_parent_id: ongdata?.orders[0]?.id,
            email: names[random_names].email,
            owner : ongdata.id,
            items: {
                conserva: 3,
                brinquedo: 3,
                dinheiro: 3,
                livro: 3,
                racao: 3,
                leite: 3,
                oleo: 3,
            },
            created_at: MyDate.getCurrentDateAndTime()
     };
     (async ()=>{
         await mongo.insertOneDonation2({ ...donation })
         ong_names[random].donations.push(donation)
    })()
        }
        resolve()
    })
}
 




export async function runScenario() {
    
        await mongo.clearAll(),
        await insertUsers(),
        await insertOngs(),
        await insertOrders()
    
        console.log('finished')
}