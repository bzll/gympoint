import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class RegistrationMail {
	get key() {
		return 'RegistrationMail';
	}

	async handle({ data }) {
		const { plan, student, registration } = data;

		await Mail.sendMail({
			to: `${student.name} <${student.email}>`,
			subject: 'Matricula realizada',
			// text: 'Você tem um novo cancelamento',
			template: 'registration',
			context: {
				name: student.name,
				plan: plan.title,
				plan_duration: plan.duration,
				plan_price: plan.price,
				plan_total: registration.price,
				start_date: format(
					parseISO(registration.start_date),
					"'dia' dd 'de' MMMM', às' H:mm'h'",
					{
						locale: pt,
					}
				),
				end_date: format(
					parseISO(registration.end_date),
					"'dia' dd 'de' MMMM', às' H:mm'h'",
					{
						locale: pt,
					}
				),
			},
		});
	}
}

export default new RegistrationMail();
