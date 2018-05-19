import * as express from 'express';
import * as Main from '../controllers/mainController';
import * as policy from '../policies/index';

const router = express.Router();


router.get('/login', policy.isNotAuthorized, Main.loginPage);

router.post('/login', policy.isNotAuthorized, Main.login);

router.get('/logout', policy.isAuthorizedApi, Main.logout);

router.get('/reg', policy.isNotAuthorized, Main.reg);

router.post('/reg', policy.isNotAuthorized, Main.createUser);

router.get('*', policy.isAuthorized, Main.mainPage);


export default router;
