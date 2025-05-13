import { validationResult } from "express-validator";

export default function validateErrors(req, res, next){
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }

    next()
}