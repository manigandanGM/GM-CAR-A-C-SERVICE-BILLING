
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Building } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CompanyDetails {
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
}

const CompanySettings = () => {
  const { toast } = useToast();
  const [details, setDetails] = useState<CompanyDetails>({
    name: 'GM CAR A/C SERVICE & MULTIBRAND',
    address: 'No:16 Gangai Amman Kallikuppam, Ambattur Chennai-53 Tamilnadu',
    city: 'Chennai',
    pincode: '600053',
    phone: '+91 84280 00085',
    email: 'gmautocool@gmail.com',
    website: 'www.gmcaracservice.com'
  });

  useEffect(() => {
    const savedDetails = localStorage.getItem('companyDetails');
    if (savedDetails) {
      setDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('companyDetails', JSON.stringify(details));
    toast({
      title: "Settings Saved",
      description: "Company details have been updated successfully.",
    });
  };

  const handleChange = (field: keyof CompanyDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Company Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={details.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={details.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={details.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code</Label>
              <Input
                id="pincode"
                value={details.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={details.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={details.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={details.website}
                onChange={(e) => handleChange('website', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanySettings;
