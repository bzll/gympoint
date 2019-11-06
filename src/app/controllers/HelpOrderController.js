import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class HelpOrderController {
	async index(req, res) {
		if (req.params.studentId) {
			const helpOrders = await HelpOrder.findAll({
				where: {
					student_id: req.params.studentId,
				},
			});

			return res.json(helpOrders);
		}

		const helpOrders = await HelpOrder.findAll({
			where: {
				answer_at: null,
			},
		});

		return res.json(helpOrders);
	}

	async store(req, res) {
		const { studentId } = req.params;

		const schema = Yup.object().shape({
			question: Yup.string().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const student = await Student.findByPk(studentId);
		if (!student) {
			return res.status(400).json({ error: 'Student does not exist' });
		}

		const { question, id } = await HelpOrder.create({
			question: req.body.question,
			student_id: studentId,
		});

		return res.json({
			question,
			id,
		});
	}

	async answer(req, res) {
		const { studentId } = req.params;

		const schema = Yup.object().shape({
			answer: Yup.string().required(),
			question_id: Yup.string().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const student = await Student.findByPk(studentId);

		if (!student) {
			return res.status(400).json({ error: 'Student does not exist' });
		}

		const questionId = req.body.question_id;

		const helpOrder = await HelpOrder.findByPk(questionId);

		if (!helpOrder) {
			return res.status(400).json({ error: 'Question not found' });
		}

		helpOrder.answer = req.body.answer;
		helpOrder.answer_at = new Date();
		await helpOrder.save();

		await Queue.add(AnswerMail.key, {
			helpOrder,
			student,
		});

		return res.json(helpOrder);
	}
}

export default new HelpOrderController();
