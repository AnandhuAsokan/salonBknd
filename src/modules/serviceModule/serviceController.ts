import { Request, Response } from 'express';
import * as serviceService from './serviceServices';
import { Types } from 'mongoose';
import { AuthRequest } from '../../types/authRequest';
import { viewUserById } from '../userModule/userRepository';

/* CREATE SERVICE */
export const createServiceController = async (req: Request, res: Response) => {
  try {
    const { name, price, duration, idealFor, category } = req.body;

    if (!name || !price || !duration || !idealFor || !category) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    const service = await serviceService.createService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE SERVICE */
export const updateServiceController = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;

    const updatedService = await serviceService.updateService(
      new Types.ObjectId(serviceId),
      req.body
    );

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* VIEW SERVICE */
export const getServiceController = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;

    const service = await serviceService.getServiceById(new Types.ObjectId(serviceId));

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* VIEW ALL SERVICES */
export const getAllServicesController = async (_req: Request, res: Response) => {
  try {
    const services = await serviceService.getAllServices();

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* DELETE SERVICE (SOFT DELETE) */
export const deleteServiceController = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;

    const deletedService = await serviceService.deleteService(new Types.ObjectId(serviceId));

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE SERVICE STATUS */
export const updateServiceStatusController = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be true or false',
      });
    }

    const service = await serviceService.updateServiceStatus(
      new Types.ObjectId(serviceId),
      isActive
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service status updated',
      data: service,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStaffSlotsByServiceController = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user?.userId;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const userInfo = await viewUserById(user)
    const { serviceId, date } = req.body;

    if (!serviceId || !date) {
      return res.status(400).json({
        success: false,
        message: 'serviceId and date are required',
      });
    }

    const data = await serviceService.getStaffSlotsByService(serviceId as string, date as string);

    return res.status(200).json({
      success: true,
      data,
      userInfo
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
