
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/components/ui/use-toast";
import { ShipmentFormInputs, ShipmentFormValues, shipmentFormSchema } from '@/components/dashboard/shipment-schema';

export function useShipmentForm(onSuccess?: (data: ShipmentFormValues) => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ShipmentFormInputs>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      shipmentName: '',
      origin: '',
      destination: '',
      items: '', // This is correctly a string for the form input
      estimatedDelivery: new Date().toISOString().split('T')[0] // Today's date as default
    }
  });

  const onSubmit = async (data: ShipmentFormInputs) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create shipment
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // The data here has already been transformed by Zod through the resolver
      console.log('Creating new shipment:', data);
      
      // Convert to the proper ShipmentFormValues type (with items as number)
      const shipmentData: ShipmentFormValues = {
        ...data,
        items: parseInt(data.items, 10)
      };
      
      toast({
        title: "Shipment Created",
        description: `Shipment ${data.shipmentName} has been created successfully.`,
      });
      
      // Reset form
      form.reset();
      
      if (onSuccess) {
        onSuccess(shipmentData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shipment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit
  };
}
