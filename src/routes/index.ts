import * as express from 'express';


const router = express.Router();

import * as Main from '../controllers/mainController';
import * as policy from '../policies/index';



router.get('/', policy.isAuthorized, Main.mainPage);

router.get('/login', Main.loginPage);

router.post('/login', Main.login);

router.get('/logout', Main.logout);

router.get('/reg', Main.reg);

router.post('/reg', Main.createUser);

router.get('/current_user', Main.currentUser);

export default router;
