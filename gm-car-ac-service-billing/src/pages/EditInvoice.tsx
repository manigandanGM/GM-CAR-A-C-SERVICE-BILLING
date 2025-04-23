
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Receipt, Phone } from 'lucide-react';
import { toast } from "sonner";

interface ServiceItem {
  description: string;
  amount: number;
}

interface Invoice {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  vehicleNumber: string;
  services: ServiceItem[];
  total: number;
}

const EditInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [services, setServices] = useState<ServiceItem[]>([{ description: '', amount: 0 }]);

  useEffect(() => {
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoice = existingInvoices.find((inv: Invoice) => inv.id === id);
    
    if (invoice) {
      setCustomerName(invoice.customerName);
      setCustomerPhone(invoice.customerPhone);
      setVehicleModel(invoice.vehicleModel);
      setVehicleNumber(invoice.vehicleNumber);
      setServices(invoice.services);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const addService = () => {
    setServices([...services, { description: '', amount: 0 }]);
  };

  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
    const updatedServices = [...services];
    if (field === 'amount') {
      updatedServices[index][field] = parseFloat(value) || 0;
    } else {
      updatedServices[index][field] = value;
    }
    setServices(updatedServices);
  };

  const calculateTotal = () => {
    return services.reduce((sum, service) => sum + service.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedInvoice: Invoice = {
      id: id!,
      date: new Date().toISOString().split('T')[0],
      customerName,
      customerPhone,
      vehicleModel,
      vehicleNumber,
      services,
      total: calculateTotal()
    };

    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const updatedInvoices = existingInvoices.map((inv: Invoice) => 
      inv.id === id ? updatedInvoice : inv
    );
    
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));

    toast.success("Invoice updated successfully");
    navigate('/');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-6 w-6" />
          Edit Invoice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <div className="flex items-center gap-2 relative">
                <Phone className="h-4 w-4 text-gray-500 absolute left-3" />
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter customer phone number"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input
                id="vehicleModel"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Services</h3>
              <Button type="button" variant="outline" onClick={addService}>
                Add Service
              </Button>
            </div>
            
            {services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`service-${index}`}>Service Description</Label>
                  <Input
                    id={`service-${index}`}
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`amount-${index}`}>Amount</Label>
                  <Input
                    id={`amount-${index}`}
                    type="number"
                    value={service.amount}
                    onChange={(e) => updateService(index, 'amount', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-lg font-semibold">
              Total: ₹{calculateTotal()}
            </div>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit">Update Invoice</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditInvoice;

