import {Users} from '../utils/variable.mjs'

export const GetUserIndexById = (req, res, next) => {
    const {params: {id}} = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).send("Bad request");
    }
    const userIndex = Users.findIndex((x) => x.id === parsedId)
    if(userIndex === -1) {
        return res.status(404).send("Not found");
    }
    req.userIndex = userIndex;
    next();
}
