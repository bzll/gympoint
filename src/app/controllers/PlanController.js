// schema validator
import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
	async index(req, res) {
		const plans = await Plan.findAll({
			where: {
				canceled_at: null,
			},
			order: ['duration'],
		});

		return res.json(plans);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			duration: Yup.number()
				.required()
				.positive(),
			price: Yup.number()
				.required()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const plan = await Plan.findByPk(req.body.duration);
		if (plan) {
			return res
				.status(400)
				.json({ message: 'Already have a plan with this duration' });
		}

		const { id, title, duration, price } = await Plan.create(req.body);

		return res.json({
			id,
			title,
			duration,
			price,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			price: Yup.number()
				.required()
				.positive(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const plan = await Plan.findByPk(req.params.planId);

		if (!plan) {
			return res
				.status(400)
				.json({ message: 'Not found any plan with this id' });
		}

		const { duration } = req.body;
		if (duration !== plan.duration) {
			const planExistents = await Plan.findOne({ where: { duration } });
			if (planExistents) {
				return res.status(400).json({
					message:
						'You cannot use this duration because have other record that is using the same.',
				});
			}
		}

		const data = await plan.update(req.body);
		return res.json(data);
	}

	async delete(req, res) {
		const plan = await Plan.findByPk(req.params.planId);

		plan.canceled_at = new Date();

		await plan.save();

		return res.json(plan);
	}
}

export default new PlanController();
