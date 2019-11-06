module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('checkins', {
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
		return queryInterface.dropTable('checkins');
	},
};
