import { Router } from "express";
import {query, validationResult, checkSchema,matchedData} from 'express-validator';
import {Users} from '../utils/variable.mjs'
import { UserValidationSchema } from "../utils/validationSchema.mjs";
import { GetUserIndexById } from "../utils/middleware.mjs";

const router = Router();

router.get('/api/users', query("filter").isString().notEmpty(), (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {query: {filter, value}} = req;
    if (filter && value) {
        const filteredUsers = Users.filter((x) => x[filter].toLowerCase().includes(value));
        return res.send(filteredUsers);
    }
    return res.send(Users);
})
router.post('/api/users', checkSchema(UserValidationSchema), (req, res) => {
    const result = validationResult(req);
    console.log(result);
    /*if (!result.isEmpty()) {
        return res.status(400).send({errors:result.array()});
    }*/
    const data = matchedData(req);
    const newUser = {id: Users[Users.length - 1].id + 1, ...data}
    Users.push(newUser);
    return res.status(201).send(newUser);
})

router.get('/api/users/:id',GetUserIndexById, (req, res) => {
    const {userIndex} = req;
    const findUser = Users[userIndex];
    if(!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser);
})

router.put('/api/users/:id',GetUserIndexById, (req, res) => {
    const {body, userIndex} = req
    Users[userIndex] = {id: Users[userIndex].id, ...body};
    return res.sendStatus(200);
});

router.patch('/api/users/:id', GetUserIndexById, (req, res) => {
    const {body, userIndex} = req;
    Users[userIndex] = { ...Users[userIndex], ...body};
    return res.sendStatus(200);
})

router.delete('/api/users/:id',GetUserIndexById, (req, res) => {
    const {userIndex} = req;
    Users.splice(userIndex, 1);
    return res.sendStatus(200);
})

export default router;