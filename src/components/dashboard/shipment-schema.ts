
import { z } from 'zod';

// Define the form schema with validation rules
export const shipmentFormSchema = z.object({
  shipmentName: z.string().min(3, "Shipment name must be at least 3 characters"),
  origin: z.string().min(2, "Origin must be at least 2 characters"),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  items: z.string()
    .refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, "Must be a positive number")
    .transform(val => parseInt(val, 10)), // Transform string to number after validation
  estimatedDelivery: z.string().min(1, "Please select a delivery date"),
  status: z.enum(['pending', 'in-transit', 'delivered', 'delayed']).default('pending')
});

// Explicitly define the input form type (before transformation)
export type ShipmentFormInputs = {
  shipmentName: string;
  origin: string;
  destination: string;
  items: string; // This is a string in the form inputs
  estimatedDelivery: string;
  status?: 'pending' | 'in-transit' | 'delivered' | 'delayed';
};

// The final values after Zod transforms them
export type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;
