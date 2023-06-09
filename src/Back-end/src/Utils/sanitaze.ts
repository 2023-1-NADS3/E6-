import { AutoScaling } from 'aws-sdk';
import Joi from 'joi'

export class Sanitaze{

    // private static orderSchema = Joi.object({
    //     name: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(4).max(40).required(), 
    //     expectation: Joi.number().min(5).max(10000).required(),
    //     min: Joi.number().min(1).max(10000).required(),
    //     max: Joi.number().min(1).max(10000).required(),
    //     expires_in: Joi.string().valid('threedays', 'oneweek', 'twoweeks', 'threeweeks', 'onemonth', 'twomonths', 'threemonths').required(),
    // });

    private static donationSchema2 = Joi.object({
        order_parent_id: Joi.string().length(24).required(),
        email: Joi.string().email().min(6).max(113).required(),
        items: Joi.object({
            conserva: Joi.number().integer().min(0).max(150).required(),
            brinquedo: Joi.number().integer().min(0).max(150).required(),
            dinheiro: Joi.number().integer().min(0).max(150).required(),
            livro: Joi.number().integer().min(0).max(150).required(),
            racao: Joi.number().integer().min(0).max(150).required(),
            leite: Joi.number().integer().min(0).max(150).required(),
            oleo: Joi.number().integer().min(0).max(150).required(),
        }).min(1).required(),
    })

    private static orderSchema2 = Joi.object({
        // ong_id = 
        name: Joi.string().regex(/^[a-zA-Z0-9ç ]*$/).min(4).max(50).required(),
        description: Joi.string().regex(/^[a-zA-Z,-.ç! ]*$/).min(85).max(400).required(), // new
        // items: Joi.object({
        //     conserva: Joi.number().integer().min(0).max(150).required(),
        //     brinquedo: Joi.number().integer().min(0).max(150).required(),
        //     dinheiro: Joi.number().integer().min(0).max(150).required(),
        //     livro: Joi.number().integer().min(0).max(150).required(),
        //     racao: Joi.number().integer().min(0).max(150).required(),
        //     leite: Joi.number().integer().min(0).max(150).required(),
        //     oleo: Joi.number().integer().min(0).max(150).required(),
        // }).length(7).required(),
        items: Joi.array().items((Joi.number().integer().min(0).max(200))).length(7).required(),
        expires_in: Joi.string().valid('threedays', 'oneweek', 'twoweeks', 'threeweeks', 'onemonth', 'twomonths', 'threemonths').required(),
    });
    
    // TODO: validate email special characters and trim spaces and allow special characters in password
    private static ONGschema = Joi.object({
        name: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(3).max(40).required(),
        // phone: Joi.string().length(11).regex(/^[0-9]*$/).required(), // NNNNNNNNN NNNNN-NNNN
        email: Joi.string().email().min(6).max(113).required(),
        // cnpj: Joi.string().pattern(/^\d{8}0001\d{2}$/).required(), // XXXXXXXX0001XX
        description: Joi.string().regex(/^[a-zA-Z,-.! ]*$/).min(85).max(400).required(),
            
        password: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(8).max(50).required(),
        confirm_password: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(8).max(50).required(),
        address: Joi.string().regex(/^[a-zA-Z,-.! ]*$/).min(5).max(80).required(),
        address_number: Joi.number().integer().min(1).max(100000).required(),
        address_state: Joi.string().valid('SP', 'AC', 'DF', 'ES', 'GO', 'SC'),
      
        working_time: Joi.object({
            seg: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            ter: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            qua: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            qui: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            sex: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            sab: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
            dom: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])-(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).required(),
        }).required(),
    })

    private static appointmentSchema = Joi.object({
        order_parent_id: Joi.string().length(24).required(),
        day: Joi.string().valid('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom').required(),
        // time: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
        items: Joi.array().items((Joi.number().integer().min(0).max(150))).length(7).required(),
    });
 
    private static userSchema = Joi.object({
        name: Joi.string().regex(/^[a-zA-Z ]*$/).min(3).max(40).required(),
        // username: Joi.string().regex(/^[a-zA-Z ]*$/).min(3).max(40).required(),
        // phone: Joi.string().length(11).regex(/^[0-9]*$/).required(), // NNNNNNNNN NNNNN-NNNN
        email: Joi.string().email().min(6).max(113).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(8).max(50).required(),
        address: Joi.string().regex(/^[a-zA-Z0-9, ]*$/).min(5).max(80).required(),
    })

    private static loginSchema = Joi.object({
        email: Joi.string().email().min(6).max(113).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(8).max(50).required(),
    })

    private static messageSchema = Joi.object({
        from: Joi.object({
            id: Joi.string().length(24).required(),
            name: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).min(3).max(40).required(),
        }),
        to: Joi.string().length(24).required(),
        text: Joi.string().min(1).max(255).required()
    })

    private static codePathSchema = Joi.string().alphanum().length(255).required();
    private static packNumberSchema = Joi.string().regex(/^[0-9]*$/).min(1).max(3).required();
    private static MongoIDSchema = Joi.string().regex(/^[a-z0-9]*$/).length(24).required();


   
    // public static sanitazeOrder(orderObj: any): any | null {
    //     const { value, error } = Sanitaze.orderSchema.validate(orderObj)
    //     if (error) {
    //         return error.details[0].message;
    //     } else {
    //         return null;
    //       }
    // }
    public static sanitazeDonation2(donationObj: any): any | null {
        const { value, error } = Sanitaze.donationSchema2.validate(donationObj)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
     }      
    public static sanitazeMongoId(id: string): any | null {
        const { value, error } = Sanitaze.MongoIDSchema.validate(id)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
     }      
    public static sanitazeAppointment(appointmentObj: any): any | null {
        const { value, error } = Sanitaze.appointmentSchema.validate(appointmentObj)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
     }      

    public static sanitazeOrder2(orderObj: any): any | null {            
// Donation
// {
//  Conservas:
//  Brinquedos:
//  Dinheiro:
//  Livros:
//  Eletronics:
//  Pet Suplies:
//  Livros:
// }
        console.log(orderObj)
        
        const { value, error } = Sanitaze.orderSchema2.validate(orderObj)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
    }

 


    // on registering
    public static sanitazeOng(ongObj: any): any | null {
        const { value, error } = Sanitaze.ONGschema.validate(ongObj)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
    }

    // on registering
    public static sanitazeUser(userObj: any): any | null {
        const { value, error } = Sanitaze.userSchema.validate(userObj)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
    }

    public static sanitazeLoginInfo(loginObj: any): any | null {
        const { value, error } = Sanitaze.loginSchema.validate(loginObj)
        if (error) {
            return error.details[0].message;
        } else {
            return null;
          }
    }
    
    public static sanitazeCodePath(code_path: string): any | null { 
        const { value, error } = Sanitaze.codePathSchema.validate(code_path);
        if (error) {
            return error.details[0].message;
        } else {
            return null;
        }
    }
    
    public static sanitazePackNumber(pack: string): any | null { 
        const { value, error } = Sanitaze.packNumberSchema.validate(pack);
        if (error) {
            return error.details[0].message;
        } else {
            return null;
        }
    }

    public static sanitazeMessage(messageObj: any): any | null { 
        const { value, error } = Sanitaze.messageSchema.validate(messageObj);
        if (error) {
            return error.details[0].message;
        } else {
            return null;
        }
    }


}




const order = {
    items: 
        {
            conserva: 65,
            brinquedo: null,
            dinheiro: null,
            livro: 80,
            racao: 32,
            leite: 88,
            oleo: 65
      } ,
    expires_in: 'threedays'
}

