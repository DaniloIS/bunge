import { Request, Response } from 'express';
import knex from '../database/connection';

class ShelvesController {
    async index(request: Request, response: Response) {
        const shelves = await knex('shelves').select('*');

        return response.json(shelves);
    }

    async create(request: Request, response: Response) {
        const { shelf, rack } = request.body;
        const shelfExists = await knex('shelves').select('shelf').where({shelf: shelf, rack: rack}).first();

        if(!shelfExists){
            const shelves = {
                shelf,
                rack,
            };

            const insertShelf = await knex('shelves').insert(shelves)
            
            return response.json({id: insertShelf, ...shelves,});
        }else{
            return response.status(401).json({ error: 'Shelf already registered!' });
        }
        

    }
}

export default ShelvesController;