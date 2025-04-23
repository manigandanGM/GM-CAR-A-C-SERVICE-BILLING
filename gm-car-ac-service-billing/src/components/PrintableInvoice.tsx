import React, { useEffect, useState } from 'react';

interface ServiceItem {
  description: string;
  amount: number;
}

interface InvoiceProps {
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  vehicleNumber: string;
  services: ServiceItem[];
  total: number;
  date: string;
  id: string;
}

interface CompanyDetails {
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
}

const PrintableInvoice: React.FC<InvoiceProps> = ({
  customerName,
  customerPhone,
  vehicleModel,
  vehicleNumber,
  services,
  total,
  date,
  id
}) => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
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
      setCompanyDetails(JSON.parse(savedDetails));
    }
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white" id="printable-invoice">
      <div className="border-b-2 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{companyDetails.name}</h1>
            <div className="mt-2 text-gray-600">
              <p>{companyDetails.address}</p>
              <p>{companyDetails.city}, Tamil Nadu - {companyDetails.pincode}</p>
              <p>Phone: {companyDetails.phone}</p>
              <p>Email: {companyDetails.email}</p>
              <p>Website: {companyDetails.website}</p>
            </div>
          </div>
          <div className="text-right">
            <img 
              src="/lovable-uploads/a502963b-46f0-4da9-a374-6d5b6261e7d4.png"
              alt="GM Car AC Service Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Invoice To:</h2>
          <div className="text-gray-600">
            <p className="font-medium">{customerName}</p>
            {customerPhone && <p>Phone: {customerPhone}</p>}
            <p>Vehicle: {vehicleModel}</p>
            <p>Number: {vehicleNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold mb-2">Invoice Details:</h2>
          <div className="text-gray-600">
            <p>Invoice #: {id}</p>
            <p>Date: {date}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2">
            <th className="text-left py-2">Description</th>
            <th className="text-right py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{service.description}</td>
              <td className="text-right py-2">₹{service.amount}</td>
            </tr>
          ))}
          <tr className="font-semibold">
            <td className="py-2">Total</td>
            <td className="text-right py-2">₹{total}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-8 pt-8 border-t">
        <p className="text-gray-600 text-center">Thank you for choosing our service!</p>
      </div>
    </div>
  );
};

export default PrintableInvoice;
