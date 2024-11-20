import { Router } from "express";
const router = Router();

router.get('/api/product', (req, res) => {
    response.send([{id: 1, name: "Chicken breast", price: 5000}]);
})

export default router;