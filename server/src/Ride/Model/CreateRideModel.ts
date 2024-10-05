import { DataTypes } from "sequelize";
import dbSequelize from "../../../dv/connection";

const Ride = dbSequelize.define('rides',{
	
	  origin_address: {
		type: DataTypes.STRING,
		allowNull: false,
	  },
	  destination_address: {
		type: DataTypes.STRING,
		allowNull: false,
	  },
	  origin_latitude: {
		type: DataTypes.FLOAT,
		allowNull: false,
	  },
	  origin_longitude: {
		type: DataTypes.FLOAT,
		allowNull: false,
	  },
	  destination_latitude: {
		type: DataTypes.FLOAT,
		allowNull: false,
	  },
	  destination_longitude: {
		type: DataTypes.FLOAT,
		allowNull: false,
	  },
	  ride_time: {
		type: DataTypes.DATE,
		allowNull: false,
	  },
	  fare_price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	  },
	  payment_status: {
		type: DataTypes.STRING,
		allowNull: false,
	  },
	  driver_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
},{
	tableName:"rides",
	timestamps:false
})


export default Ride;