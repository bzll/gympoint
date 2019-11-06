// schema validator
import * as Yup from 'yup';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
	async index(req, res) {
		const registrations = await Registration.findAll({
			where: {
				canceled_at: null,
			},
		});

		return res.json(registrations);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			start_date: Yup.date().required(),
			plan_id: Yup.number()
				.required()
				.positive(),
			student_id: Yup.number()
				.required()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}
		const { plan_id, student_id } = req.body;
		const registrationExists = await Registration.findOne({
			where: {
				canceled_at: null,
				plan_id,
				student_id,
			},
		});

		if (registrationExists) {
			return res.status(400).json({ error: 'Registration already exists' });
		}

		const existPlan = await Plan.findByPk(plan_id);
		if (!existPlan) {
			return res
				.status(400)
				.json({ error: 'The plan id informed does not exist' });
		}

		const existStudent = await Student.findByPk(student_id);
		if (!existStudent) {
			return res
				.status(400)
				.json({ error: 'The student id informed does not exist' });
		}

		const { start_date, end_date, price } = await Registration.create(req.body);

		await Queue.add(RegistrationMail.key, {
			plan: existPlan,
			student: existStudent,
			registration: {
				price,
				start_date,
				end_date,
			},
		});

		return res.json({
			start_date,
			end_date,
			price,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			start_date: Yup.date().required(),
			plan_id: Yup.number()
				.required()
				.positive(),
			student_id: Yup.number()
				.required()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const registration = await Registration.findByPk(req.params.registrationId);
		if (!registration) {
			return res
				.status(400)
				.json({ message: 'Not found any registration with this id' });
		}

		const { plan_id, student_id } = req.body;

		const existPlan = await Plan.findByPk(plan_id);
		if (!existPlan) {
			return res
				.status(400)
				.json({ error: 'The plan id informed does not exist' });
		}

		const existStudent = await Student.findByPk(student_id);
		if (!existStudent) {
			return res
				.status(400)
				.json({ error: 'The student id informed does not exist' });
		}

		return res.json(await registration.update(req.body));
	}

	async delete(req, res) {
		const registration = await Registration.findByPk(req.params.registrationId);

		registration.canceled_at = new Date();

		await registration.save();

		return res.json(registration);
	}
}

export default new RegistrationController();
