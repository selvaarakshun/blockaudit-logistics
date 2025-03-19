
import { Package, MapPin, Truck, Loader2 } from 'lucide-react';
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
import { ShipmentFormInputs } from './shipment-schema';
import { UseFormReturn } from 'react-hook-form';

interface ShipmentFormProps {
  form: UseFormReturn<ShipmentFormInputs>;
  onSubmit: (data: ShipmentFormInputs) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ShipmentForm = ({ form, onSubmit, isSubmitting, onCancel }: ShipmentFormProps) => {
  return (
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
        
        <div className="flex justify-end gap-2 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="gap-1 min-w-[140px] transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Shipment
                <Package className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShipmentForm;
