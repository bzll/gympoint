import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
	static init(sequelize) {
		super.init(
			{
				question: Sequelize.STRING,
				answer: Sequelize.INTEGER,
				answer_at: Sequelize.DATE,
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'student_id', as: 'student' });
	}
}

export default HelpOrder;
