import { Router } from 'express';
// importando módulo body-parser para pegar dados enviados dentro do corpo da requisição.
import bodyParser from 'body-parser';
import createNewUser from '../controller/userController';


const usersRouter = Router();

// configurando bodyParser
usersRouter.use(bodyParser.urlencoded({extended:false}))
usersRouter.use(bodyParser.json())

usersRouter.post('/', (req, res) => {
	res.send(getAllUsers());
});

usersRouter.post('/registerUser', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	res.send(createNewUser(password,email));
});

usersRouter.get('/:userId', (req, res) => {
	res.send(res.__('Returning user with id {{userId}}', { userId: req.params.userId }));
});

usersRouter.put('/:userId', (req, res) => {
	res.send(res.__('Updating user with id {{userId}}', { userId: req.params.userId }));
});

usersRouter.get('/login', (req, res) => {
	res.send(res.__('Executing login logic'));
});

export default usersRouter;

