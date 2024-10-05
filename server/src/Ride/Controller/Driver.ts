import { Request, Response } from 'express';
import Driver from '../Model/DriverModel';

// Create a new driver
export const createDriver = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, profile_image_url, car_image_url, car_seats, rating } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !car_seats) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new driver record
    const newDriver = await Driver.create({
      first_name,
      last_name,
      profile_image_url,
      car_image_url,
      car_seats,
      rating,
    });

    return res.status(201).json({ data: newDriver });
  } catch (error) {
    console.error('Error creating driver:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const readDriver = async (req:Request, res:Response) => {
  try {
    
  const allDrivers = await Driver.findAll()
  return res.json({
    data:allDrivers
  })
  } catch (error: any) {
    return res.json({
      error:true,
      message:error.message
    })
  }
  
}