import { Request, Response } from 'express';
import Ride from '../Model/CreateRideModel';

export const createRide = async (req: Request, res: Response) => {
  try {
    const {
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    } = req.body;

    // Validate required fields
    if (
      !origin_address ||
      !destination_address ||
      origin_latitude === undefined ||
      origin_longitude === undefined ||
      destination_latitude === undefined ||
      destination_longitude === undefined ||
      !ride_time ||
      fare_price === undefined ||
      !payment_status ||
      !driver_id ||
      !user_id
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ride = await Ride.create({
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    });

    return res.status(201).json({ data: ride });
  } catch (error) {
    console.error('Error creating ride:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const recentRides = async (req:Request, res:Response) => {
  try {
    
  const recent = await Ride.findAll()
  return res.json({
    data:recent
  })
  } catch (error: any) {
    return res.json({
      error:true,
      message:error.message
    })
  }
  
}