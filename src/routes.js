import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.post('/sessions', SessionController.store);

routes.post('/students/:studentId/help-orders', HelpOrderController.store);
routes.get('/students/:studentId/help-orders', HelpOrderController.index);

// Those routes below will be validated by the middleware auth.js
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plan', PlanController.index);
routes.post('/plan', PlanController.store);
routes.put('/plan/:planId', PlanController.update);
routes.delete('/plan/:planId', PlanController.delete);

routes.get('/registration', RegistrationController.index);
routes.post('/registration', RegistrationController.store);
routes.put('/registration/:registrationId', RegistrationController.update);
routes.delete('/registration/:registrationId', RegistrationController.delete);

routes.post('/students/:studentId/checkins', CheckinController.store);
routes.get('/students/:studentId/checkins', CheckinController.index);

routes.get('/help-orders', HelpOrderController.index);
routes.post('/help-orders/:studentId/answer', HelpOrderController.answer);

export default routes;
