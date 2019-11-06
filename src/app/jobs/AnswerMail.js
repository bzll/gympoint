import Mail from '../../lib/Mail';

class AnswerMail {
	get key() {
		return 'AnswerMail';
	}

	async handle({ data }) {
		const { helpOrder, student } = data;

		await Mail.sendMail({
			to: `${student.name} <${student.email}>`,
			subject: 'Sua pergunta foi respondida',
			// text: 'Você tem um novo cancelamento',
			template: 'answer',
			context: {
				name: student.name,
				question: helpOrder.question,
				answer: helpOrder.answer,
			},
		});
	}
}

export default new AnswerMail();
