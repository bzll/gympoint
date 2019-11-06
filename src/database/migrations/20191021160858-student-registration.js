module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('registrations', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			student_id: {
				type: Sequelize.INTEGER,
				references: { model: 'students', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: true,
			},
			plan_id: {
				type: Sequelize.INTEGER,
				references: { model: 'plans', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: true,
			},
			start_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			end_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			canceled_at: {
				type: Sequelize.DATE,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: queryInterface => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
			*/
		return queryInterface.dropTable('registrations');
	},
};
