import { Router } from 'express';
import path from 'path';

const router = Router();

router.get("/form/:formType", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dynamicForm.html'));
});

router.get("/entry", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'entry.html'))
})

export default router;