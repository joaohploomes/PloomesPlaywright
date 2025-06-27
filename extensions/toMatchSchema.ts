import { ZodError, type ZodSchema } from "zod";
import { expect } from "@playwright/test";

function toMatchSchema<T>(received: T, schema: ZodSchema<T>){
    try{
        schema.parse(received);
        return {
            pass: true,
            message: () => "Esquema passou"
        }
    }catch(err){
        if(err instanceof ZodError){
            return {
                pass: false,
                message: () => "Esquema quebrou"
            }
        }
        return {
            pass: false,
            message: () => "Esquema quebrou"
        }
    }
}

expect.extend({ toMatchSchema });

export default toMatchSchema;
