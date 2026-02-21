import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle, FileCheck, Lock } from 'lucide-react';
import { CertificateForm } from './components/CertificateForm';
import { Certificate } from './components/Certificate';
import { initialData, CertificateData } from './types';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [data, setData] = useState<CertificateData>(initialData);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const certificateRef = useRef<HTMLDivElement>(null);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDownload = async () => {
    if (!hiddenCertificateRef.current) return;

    try {
      addToast('info', 'Generating PDF...');
      
      // Wait a bit for any re-renders and image loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(hiddenCertificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        allowTaint: false,
        windowWidth: 210 * 3.7795275591, // A4 width in pixels (approx)
        windowHeight: 297 * 3.7795275591 // A4 height in pixels (approx)
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Police_Verification_${data.applicationNumber}.pdf`);
      
      addToast('success', 'PDF Downloaded Successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      addToast('error', 'Failed to generate PDF. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!hiddenCertificateRef.current) return;

    try {
      addToast('info', 'Preparing for print...');
      
      // Wait a bit for any re-renders
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(hiddenCertificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Open PDF in new tab
      const pdfBlob = pdf.output('bloburl');
      window.open(pdfBlob, '_blank');
      
      addToast('success', 'Print dialog opened');
    } catch (error) {
      console.error('Error printing:', error);
      addToast('error', 'PDF generation failed. Falling back to browser print.');
      window.print();
    }
  };

  const handleCopyQR = async () => {
    try {
      const qrData = JSON.stringify({
        appNo: data.applicationNumber,
        name: data.applicantName,
        date: data.reportDate,
        id: data.verificationId
      });
      await navigator.clipboard.writeText(qrData);
      addToast('success', 'QR Data copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      addToast('error', 'Failed to copy QR data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Hidden Certificate for PDF Generation - Full Scale */}
      {/* We use absolute positioning with z-index -50 to keep it in the DOM but hidden, which is better for html2canvas than off-screen fixed */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none w-[210mm] h-[297mm] bg-white">
        <Certificate ref={hiddenCertificateRef} data={data} />
      </div>

      {/* Navbar */}
      <nav className="bg-gov-navy text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-gov-gold" />
              <span className="font-bold text-xl tracking-tight">PoliceVerify</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-200">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">Verify</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <button className="bg-gov-red px-4 py-1.5 rounded-full text-white hover:bg-red-800 transition-colors shadow-md">
                Official Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gov-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gov-navy via-blue-900 to-gov-navy opacity-90"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-gov-gold text-sm font-medium mb-6 border border-white/20">
              <CheckCircle className="w-4 h-4" />
              Official Verification Portal
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Generate Official <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gov-gold to-yellow-200">
                Verification Certificates
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Secure, instant, and verified police clearance certificates generation system for official use.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Form */}
          <div className="order-2 lg:order-1">
            <CertificateForm 
              data={data} 
              onChange={setData} 
              onGenerate={() => {}} // State updates automatically
              onDownload={handleDownload}
              onPrint={handlePrint}
              onCopy={handleCopyQR}
            />
          </div>

          {/* Right Column: Preview */}
          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-gov-gold" />
                    Live Preview
                  </h3>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">A4 Format</span>
                </div>
                
                {/* Preview Container - Scaled down to fit */}
                <div className="overflow-hidden rounded-lg bg-white relative group">
                  <div className="origin-top-left transform scale-[0.45] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.5] xl:scale-[0.6] h-[297mm] w-[210mm]">
                    <Certificate ref={certificateRef} data={data} />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <p className="text-white font-medium flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Official Document Preview
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure & Encrypted", desc: "All data is processed locally and encrypted with government-grade standards." },
              { icon: CheckCircle, title: "Instant Verification", desc: "Generate verified certificates instantly with unique QR codes for validation." },
              { icon: Lock, title: "Official Format", desc: "Strict adherence to the Karnataka State Police verification certificate format." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gov-navy/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gov-navy" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-gov-gold" />
            <span className="text-white font-bold text-lg">PoliceVerify</span>
          </div>
          <p className="text-sm mb-4">
            © 2026 Police Verification System | Secure | Encrypted | Verified
          </p>
          <div className="flex justify-center gap-6 text-xs">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Government Portal</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
