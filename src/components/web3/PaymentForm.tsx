
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { CircleDollarSign, Send, Loader2 } from 'lucide-react';

// Token selection options
const tokens = [
  { id: 'usdc', name: 'USDC', icon: '💲', decimals: 6 },
  { id: 'usdt', name: 'USDT', icon: '💵', decimals: 6 },
  { id: 'guudz', name: 'GuudzToken', icon: '🚚', decimals: 18 },
];

// Form schema
const formSchema = z.object({
  recipientAddress: z.string()
    .min(42, 'Wallet address must be valid')
    .max(42, 'Wallet address must be valid'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)), { message: 'Amount must be a number' })
    .refine((val) => Number(val) > 0, { message: 'Amount must be greater than 0' }),
  token: z.string().min(1, 'Select a token'),
  memo: z.string().optional(),
});

const PaymentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientAddress: '',
      amount: '',
      token: 'usdc',
      memo: '',
    },
  });
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    try {
      // This would be replaced with actual blockchain transaction logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Sent",
        description: `${values.amount} ${values.token.toUpperCase()} sent to ${values.recipientAddress.slice(0, 6)}...${values.recipientAddress.slice(-4)}`,
      });
      
      form.reset();
    } catch (error) {
      console.error('Error sending payment:', error);
      toast({
        title: "Transaction Failed",
        description: "Failed to send payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const selectedToken = tokens.find(t => t.id === form.watch('token')) || tokens[0];
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
        <CardHeader>
          <CardTitle>Send Payment</CardTitle>
          <CardDescription>Transfer stablecoins to another wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="recipientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="0x..." 
                        className="bg-white dark:bg-logistics-dark/80" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-white dark:bg-logistics-dark/80" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tokens.map((token) => (
                            <SelectItem key={token.id} value={token.id}>
                              <div className="flex items-center gap-2">
                                <span>{token.icon}</span>
                                <span>{token.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Memo (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Payment for shipment #123" 
                        className="bg-white dark:bg-logistics-dark/80" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send {selectedToken.name}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Your Wallet</CardTitle>
            <CardDescription>Connected wallet balances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tokens.map(token => (
              <div key={token.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {token.icon}
                  </div>
                  <div>
                    <div className="font-medium">{token.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {token.id === 'guudz' ? 'Custom Token' : 'Stablecoin'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-medium">
                    {token.id === 'usdc' && '1,234.56'}
                    {token.id === 'usdt' && '567.89'}
                    {token.id === 'guudz' && '10,000.00'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {token.id === 'usdc' && '≈ $1,234.56'}
                    {token.id === 'usdt' && '≈ $567.89'}
                    {token.id === 'guudz' && '≈ $500.00'}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Refresh</Button>
            <Button variant="outline">Deposit</Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <CircleDollarSign className="h-6 w-6" />
                <span>Request Payment</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                <Send className="h-6 w-6" />
                <span>Bulk Payments</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentForm;
