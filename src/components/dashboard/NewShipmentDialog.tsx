
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Package, ArrowRight, Truck, MapPin } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the form schema with validation rules
const shipmentFormSchema = z.object({
  shipmentName: z.string().min(3, "Shipment name must be at least 3 characters"),
  origin: z.string().min(2, "Origin must be at least 2 characters"),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  items: z.string().transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val > 0, "Must be a positive number"),
  estimatedDelivery: z.string().min(1, "Please select a delivery date")
});

type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;

interface NewShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewShipmentDialog = ({ open, onOpenChange }: NewShipmentDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      shipmentName: '',
      origin: '',
      destination: '',
      items: '',
      estimatedDelivery: ''
    }
  });

  const onSubmit = async (data: ShipmentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create shipment
      // This would connect to MongoDB in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Creating new shipment:', data);
      
      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
      
      toast({
        title: "Shipment Created",
        description: `Shipment ${data.shipmentName} has been created successfully.`,
      });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="size-5" />
            Create New Shipment
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new blockchain-verified shipment.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shipmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shipment name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <MapPin className="size-3.5" /> Origin
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Starting location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <MapPin className="size-3.5" /> Destination
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Final destination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Package className="size-3.5" /> Items
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        placeholder="Number of items" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="estimatedDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Truck className="size-3.5" /> Estimated Delivery
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="gap-1"
              >
                Create Shipment
                {!isSubmitting && <ArrowRight className="size-4" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewShipmentDialog;
