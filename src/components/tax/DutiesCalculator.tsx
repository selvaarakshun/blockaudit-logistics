
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Calculator, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DutiesCalculator = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [productValue, setProductValue] = useState('');
  const [country, setCountry] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [calculationResult, setCalculationResult] = useState<{
    duty: number;
    gst: number;
    socialWelfare: number;
    total: number;
  } | null>(null);
  
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CN', name: 'China' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'FR', name: 'France' },
  ];
  
  const productCategories = [
    { code: 'electronics', name: 'Electronics', dutyRate: 0.15 },
    { code: 'clothing', name: 'Clothing & Textiles', dutyRate: 0.20 },
    { code: 'automotive', name: 'Automotive Parts', dutyRate: 0.10 },
    { code: 'cosmetics', name: 'Cosmetics', dutyRate: 0.25 },
    { code: 'food', name: 'Food Products', dutyRate: 0.05 },
    { code: 'furniture', name: 'Furniture', dutyRate: 0.15 },
    { code: 'jewelry', name: 'Jewelry', dutyRate: 0.30 },
    { code: 'medical', name: 'Medical Supplies', dutyRate: 0.08 },
  ];
  
  const handleCalculate = () => {
    if (!productValue || !country || !productCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const value = parseFloat(productValue);
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Invalid Value",
        description: "Please enter a valid product value",
        variant: "destructive"
      });
      return;
    }
    
    const category = productCategories.find(c => c.code === productCategory);
    if (!category) return;
    
    // Calculate import duty
    const dutyAmount = value * category.dutyRate;
    
    // Calculate GST/VAT (assume 10%)
    const gstAmount = (value + dutyAmount) * 0.10;
    
    // Calculate social welfare surcharge (assume 1%)
    const socialWelfareAmount = dutyAmount * 0.01;
    
    // Calculate total
    const totalAmount = value + dutyAmount + gstAmount + socialWelfareAmount;
    
    setCalculationResult({
      duty: dutyAmount,
      gst: gstAmount,
      socialWelfare: socialWelfareAmount,
      total: totalAmount
    });
    
    toast({
      title: "Calculation Complete",
      description: "Import duties and taxes have been calculated"
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-logistics-blue" />
            Duties & Taxes Calculator
          </CardTitle>
          <CardDescription>
            Calculate import duties and taxes for your international shipments
          </CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="px-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Value (USD)</label>
              <Input
                type="number"
                placeholder="Enter product value"
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Origin Country</label>
              <Select
                value={country}
                onValueChange={setCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select origin country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Category</label>
              <Select
                value={productCategory}
                onValueChange={setProductCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category.code} value={category.code}>
                      {category.name} ({(category.dutyRate * 100).toFixed(0)}% duty)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleCalculate} 
              className="w-full"
            >
              Calculate Duties & Taxes
            </Button>
            
            {calculationResult && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-3">Calculation Results</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1">
                    <span className="text-logistics-gray">Product Value</span>
                    <span>{formatCurrency(parseFloat(productValue))}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-logistics-gray">Import Duty</span>
                    <span>{formatCurrency(calculationResult.duty)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-logistics-gray">GST/VAT (10%)</span>
                    <span>{formatCurrency(calculationResult.gst)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-logistics-gray">Social Welfare Surcharge</span>
                    <span>{formatCurrency(calculationResult.socialWelfare)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold border-t mt-1">
                    <span>Total Amount</span>
                    <span>{formatCurrency(calculationResult.total)}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-logistics-light-gray dark:bg-logistics-blue/10 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CreditCard className="h-5 w-5 text-logistics-blue mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium">Payment Options</h5>
                      <p className="text-xs text-logistics-gray mt-1">
                        Pay taxes and duties in advance to ensure your shipment doesn't face delays at customs.
                      </p>
                      <Button 
                        className="mt-2 text-xs h-8" 
                        onClick={() => toast({
                          title: "Payment Simulation",
                          description: "In a real app, this would open a payment gateway."
                        })}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DutiesCalculator;
