import { DataTypes } from 'sequelize';
import dbSequelize from '../../../dv/connection'; // Import your database connection

const Driver = dbSequelize.define('drivers', {
 
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  profile_image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  car_image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  car_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // CHECK (car_seats > 0)
    },
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 5, // CHECK (rating >= 0 AND rating <= 5)
    },
  },
}, {
  tableName: 'drivers',
  timestamps: false,
});

export default Driver;
