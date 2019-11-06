module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('plans', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			duration: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
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
		return queryInterface.dropTable('plans');
	},
};
