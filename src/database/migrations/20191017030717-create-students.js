module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('students', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			age: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			weight: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			height: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
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
      return queryInterface.dropTable('users');
    */
		return queryInterface.dropTable('users');
	},
};
