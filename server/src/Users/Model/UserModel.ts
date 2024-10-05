import { DataTypes } from "sequelize";
import dbSequelize from "../../../dv/connection";

const Users = dbSequelize.define("Users", {
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	
	name: {
		type: DataTypes.STRING,
		allowNull: true
	},
	clerkId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	createdOn:{
		type:DataTypes.DATE,
		allowNull:true
	},
	updatedOn:{
		type:DataTypes.DATE,
		allowNull:true
	},
	block:{
		type:DataTypes.INTEGER,
		allowNull:true
	},
	bloackedOn:{
		type:DataTypes.DATE,
		allowNull:true
	}
}, {
	tableName: 'users',
	timestamps: false
})

export default Users;