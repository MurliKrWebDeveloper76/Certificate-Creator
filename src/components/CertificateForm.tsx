import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Printer, RefreshCw, Shield, CheckCircle } from 'lucide-react';
import { CertificateData } from '../types';

interface CertificateFormProps {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
  onGenerate: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onCopy: () => void;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({ 
  data, 
  onChange, 
  onGenerate,
  onDownload,
  onPrint,
  onCopy
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const generateRandomID = () => {
    const randomNum = Math.floor(Math.random() * 10000000000);
    onChange({
      ...data,
      applicationNumber: `P${randomNum}`
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 md:p-8 rounded-2xl"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
        <div className="p-2 bg-gov-navy/10 rounded-lg">
          <FileText className="w-6 h-6 text-gov-navy" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Certificate Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Application Details */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Application Number</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="applicationNumber"
              value={data.applicationNumber}
              onChange={handleChange}
              className="input-field bg-gray-50"
            />
            <button 
              onClick={generateRandomID}
              className="p-2 text-gov-navy hover:bg-gov-navy/10 rounded-lg transition-colors"
              title="Generate Random ID"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name</label>
          <input
            type="text"
            name="applicantName"
            value={data.applicantName}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's / Husband's Name</label>
          <input
            type="text"
            name="fatherName"
            value={data.fatherName}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Verified Address</label>
          <textarea
            name="verifiedAddress"
            value={data.verifiedAddress}
            onChange={handleChange}
            rows={3}
            className="input-field"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
          <textarea
            name="permanentAddress"
            value={data.permanentAddress}
            onChange={handleChange}
            rows={2}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={data.fromDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            name="toDate"
            value={data.toDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Type</label>
          <select
            name="verificationType"
            value={data.verificationType}
            onChange={handleChange}
            className="input-field"
          >
            <option>Application for Job Verification</option>
            <option>Passport Verification</option>
            <option>Tenant Verification</option>
            <option>Domestic Help Verification</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Date</label>
          <input
            type="date"
            name="reportDate"
            value={data.reportDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
          <input
            type="text"
            name="purpose"
            value={data.purpose}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Verified By (Officer)</label>
          <input
            type="text"
            name="verifiedBy"
            value={data.verifiedBy}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={handleChange}
            className="input-field"
          />
        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button 
          onClick={onGenerate}
          className="btn-primary flex-1"
        >
          <Shield className="w-5 h-5" />
          Update Preview
        </button>
        
        <button 
          onClick={onDownload}
          className="btn-secondary flex-1"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>

        <button 
          onClick={onPrint}
          className="btn-secondary flex-1"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>

        <button 
          onClick={onCopy}
          className="btn-secondary flex-1"
        >
          <RefreshCw className="w-5 h-5" />
          Copy QR Data
        </button>
      </div>
    </motion.div>
  );
};
