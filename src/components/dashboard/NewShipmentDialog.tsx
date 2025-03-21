
import { Package } from 'lucide-react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ShipmentForm from './ShipmentForm';
import { useShipmentForm } from '@/hooks/use-shipment-form';
import { ShipmentFormValues } from './shipment-schema';

interface NewShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNewShipment: (shipmentData: ShipmentFormValues) => void;
}

const NewShipmentDialog = ({ open, onOpenChange, onNewShipment }: NewShipmentDialogProps) => {
  const { form, isSubmitting, onSubmit } = useShipmentForm((data) => {
    // Pass the new shipment data to the parent component
    onNewShipment(data);
    // Close dialog on success
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-white dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="size-5 text-blue-500" />
            Create New Shipment
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fill in the details to create a new blockchain-verified shipment. 
            All fields are required to ensure proper tracking and verification.
            <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
              <li>Enter a descriptive name for easy identification</li>
              <li>Specify both origin and destination locations</li>
              <li>Input the number of items being shipped</li>
              <li>Set the estimated delivery date</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        
        <ShipmentForm 
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewShipmentDialog;
