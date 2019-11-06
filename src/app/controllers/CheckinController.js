import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
	async index(req, res) {
		const checkins = await Checkin.findAll({
			where: {
				student_id: req.params.studentId,
			},
		});
		return res.json(checkins);
	}

	async store(req, res) {
		const checkins = await Checkin.findAll({
			where: {
				student_id: req.params.studentId,
				created_at: {
					[Op.between]: [subDays(new Date(), 7), new Date()],
				},
			},
		});

		const student = await Student.findByPk(req.params.studentId);

		if (!student) {
			return res.status(400).json({
				error: 'This student does not exist',
			});
		}

		if (checkins.length >= 5) {
			return res.status(400).json({
				error: 'You already made the limit (5) in a week of checkins',
			});
		}

		await Checkin.create({
			student_id: req.params.studentId,
		});

		return res.status(200).json({ message: 'Created with sucessful.' });
	}
}

export default new CheckinController();
