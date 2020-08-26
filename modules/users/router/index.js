import { Router } from 'express';
// importando módulo body-parser para pegar dados enviados dentro do corpo da requisição.
import bodyParser from 'body-parser';
import {registerNewUser, logUser, updateUser, getAllUsers, getUserById} from '../controller/userController';


const usersRouter = Router();

// configurando bodyParser
usersRouter.use(bodyParser.urlencoded({extended:false}))
usersRouter.use(bodyParser.json())

//-- rotas comuns --

usersRouter.post('/register', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	res.send(registerNewUser(password,email));
});


usersRouter.post('/login', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	res.send(logUser(password,email));
});

usersRouter.post('/update', (req, res) => {
	const id = req.body.id;
	const newPassword = req.body.password;
	const newEmail = req.body.email;
	res.send(updateUser(id,newPassword,newEmail));
});


//---rotas de teste de administradores---

usersRouter.post('/getAll', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	res.send(getAllUsers());
});

usersRouter.post('/getOne', (req, res) => {
	//const adminpassword = req.body.adminpassword; 
	const id = req.body.id;
	res.send(getUserById(id));
});






export default usersRouter;

