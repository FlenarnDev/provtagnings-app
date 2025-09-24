import { Router } from "express";
import path from 'path';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

const router = Router();

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'admin.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { username } });

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        if (user.password === password) {
            (req.session as any).loggedIn = true;
            (req.session as any).username = username;
            return res.status(200).send('Login successful');
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send('Internal server error');
    }
});

router.get('/dashboard', (req, res) => {
    if (!(req.session as any).loggedIn) {
        return res.redirect('/admin');
    }
    
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
    });
  
    router.get('/logout', (req, res) => {
        req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid');
        res.redirect('/admin');
    });
});

router.get('/entries', (req, res) => {
    if (!(req.session as any).loggedIn) {
        return res.redirect('/admin'); 
    }
    
    res.sendFile(path.join(__dirname, '../public', 'entries.html'))
});

export default router;