import express, { Router } from 'express';

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Books route"
    });
});

export default router;