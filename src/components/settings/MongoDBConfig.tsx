
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Database, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { configureMongoDBConnection } from '@/services/uploadService';

const mongodbSchema = z.object({
  connectionString: z.string().min(20, "Connection string is too short"),
  databaseName: z.string().min(1, "Database name is required"),
});

type MongoDBFormValues = z.infer<typeof mongodbSchema>;

const MongoDBConfig = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const form = useForm<MongoDBFormValues>({
    resolver: zodResolver(mongodbSchema),
    defaultValues: {
      connectionString: '',
      databaseName: 'logistics',
    }
  });

  const onSubmit = async (data: MongoDBFormValues) => {
    setIsConnecting(true);
    
    try {
      // Simulate connecting to MongoDB
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = configureMongoDBConnection(data.connectionString);
      
      if (result.isConnected) {
        setIsConnected(true);
        toast({
          title: "Connection Successful",
          description: "Successfully connected to MongoDB database.",
        });
      } else {
        throw new Error("Connection failed");
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MongoDB. Please check your connection string.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Database className="size-4" />
          MongoDB Configuration
        </h3>
        {isConnected && (
          <span className="text-green-600 flex items-center gap-1 text-sm">
            <CheckCircle className="size-3.5" />
            Connected
          </span>
        )}
      </div>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="connectionString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MongoDB Connection String</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="mongodb://username:password@host:port/database" 
                      type="password"
                      autoComplete="off"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your MongoDB connection string including credentials
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="databaseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter database name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="mt-2"
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect to MongoDB"}
              {!isConnecting && <Save className="ml-2 size-4" />}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 rounded-md bg-logistics-light-gray dark:bg-logistics-dark/70 p-4 text-sm">
          <h4 className="font-medium mb-2 flex items-center gap-1.5">
            <AlertCircle className="size-4 text-logistics-blue" />
            MongoDB Connection Notes
          </h4>
          <ul className="list-disc list-inside space-y-1 text-logistics-gray">
            <li>Your connection string is stored securely and encrypted</li>
            <li>For production use, consider using environment variables</li>
            <li>Make sure your MongoDB instance allows connections from your application</li>
            <li>Set up proper authentication and access controls in your MongoDB database</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MongoDBConfig;
