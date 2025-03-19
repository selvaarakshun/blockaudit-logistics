
import { Package } from 'lucide-react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import ShipmentForm from './ShipmentForm';
import { useShipmentForm } from '@/hooks/use-shipment-form';

interface NewShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewShipmentDialog = ({ open, onOpenChange }: NewShipmentDialogProps) => {
  const { form, isSubmitting, onSubmit } = useShipmentForm(() => {
    // Close dialog on success
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="size-5" />
            Create New Shipment
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
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
