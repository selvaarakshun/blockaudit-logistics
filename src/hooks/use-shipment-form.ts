
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/components/ui/use-toast";
import { ShipmentFormInputs, shipmentFormSchema } from '@/components/dashboard/shipment-schema';

export function useShipmentForm(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ShipmentFormInputs>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      shipmentName: '',
      origin: '',
      destination: '',
      items: '', // This is correctly a string for the form input
      estimatedDelivery: ''
    }
  });

  const onSubmit = async (data: ShipmentFormInputs) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create shipment
      // This would connect to MongoDB in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // The data here has already been transformed by Zod through the resolver
      console.log('Creating new shipment:', data);
      
      // Reset form and show success message
      form.reset();
      
      toast({
        title: "Shipment Created",
        description: `Shipment ${data.shipmentName} has been created successfully.`,
      });
      
      if (onSuccess) {
        onSuccess();
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
