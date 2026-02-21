import React, { forwardRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Shield } from 'lucide-react';
import { CertificateData } from '../types';

interface CertificateProps {
  data: CertificateData;
  className?: string;
}

// Helper to format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(({ data, className }, ref) => {
  const [imgError, setImgError] = useState(false);

  const defaultQrData = JSON.stringify({
    appNo: data.applicationNumber,
    name: data.applicantName,
    date: data.reportDate,
    id: data.verificationId
  });

  const qrValue = data.qrCodeText || defaultQrData;

  // Current date for signature
  const now = new Date();
  const signatureDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} +05:30`;

  return (
    <div 
      ref={ref} 
      className={`w-[210mm] h-[297mm] bg-white mx-auto relative text-black box-border certificate-content ${className || ''}`}
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Outer Border Container - 3px solid dark grey #5c5c5c */}
      <div className="h-full w-full border-[3px] border-[#5c5c5c] p-[3px]">
        {/* Inner Border Container - 1px solid light grey #b5b5b5 */}
        <div className="h-full w-full border border-[#b5b5b5] p-[20px] flex flex-col relative">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6 relative">
            {/* Left Spacer to balance layout if needed, or just flex */}
            <div className="w-[200px]"></div> 
            
            {/* Center: Logo and Gov Text */}
            <div className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 top-0">
               <div className="w-[140px] h-[100px] mb-2 relative flex items-center justify-center">
                  {!imgError ? (
                    <img 
                      src="https://i.postimg.cc/9MfTRTD5/kar-main-logo.png" 
                      alt="Karnataka State Police" 
                      className="w-full h-full object-contain"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Shield className="w-[100px] h-[100px] text-[#1f2937]" />
                    </div>
                  )}
               </div>
               <h1 className="text-[16px] font-bold text-center leading-[1.2]">
                 Government of Karnataka<br/>(Police Department)
               </h1>
            </div>

            {/* Right: Office Address */}
            <div className="text-right text-[13px] font-medium leading-[1.2] w-[200px]">
              Office of the<br/>
              Commissioner of Police<br/>
              {data.city}<br/>
              {data.state}
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 mt-4">
            <h2 className="text-[18px] font-bold uppercase underline decoration-1 underline-offset-4 tracking-wide">
              POLICE VERIFICATION CERTIFICATE
            </h2>
          </div>

          {/* Photo Section - Absolute positioned as per typical layout, or flex. 
              Prompt says "Right aligned". Let's put it absolute to not mess with the grid flow 
              or use a flex row for the first part. 
              Given the prompt "Photo Section... Right aligned", and typically it's next to the details.
          */}
          {data.photoUrl && (
            <div className="absolute right-[20px] top-[180px] w-[120px] h-[150px] border border-gray-300 bg-gray-100 overflow-hidden z-10">
              <img 
                src={data.photoUrl} 
                alt="Applicant" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Content Grid */}
          <div className="flex flex-col gap-[10px] text-[13px] leading-[1.2] relative pr-[140px]">
            
            {/* Row 1 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">1.</div>
              <div className="w-[200px] font-bold text-[14px]">Application Number</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span> 
                <span>{data.applicationNumber}</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">2.</div>
              <div className="w-[200px] font-bold text-[14px]">Applicant Name</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.applicantName}</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">3.</div>
              <div className="w-[200px] font-bold text-[14px]">Father's/ Husband's Name</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.fatherName}</span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">4.</div>
              <div className="w-[200px] font-bold text-[14px]">Verified Address</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.verifiedAddress}</span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex items-center mt-1">
              <div className="w-[30px] text-[14px]">5.</div>
              <div className="w-[200px] font-bold text-[14px]">Period of Stay at<br/>Present Address</div>
              <div className="flex-1 flex items-center">
                 <span className="mr-2">:</span>
                 <div className="flex gap-8">
                   <span><span className="font-bold">From Date:</span> {formatDate(data.fromDate)}</span>
                   <span><span className="font-bold">To Date:</span> {formatDate(data.toDate)}</span>
                 </div>
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex items-start mt-1">
              <div className="w-[30px] text-[14px]">6.</div>
              <div className="w-[200px] font-bold text-[14px]">Permanent Address</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.permanentAddress}</span>
              </div>
            </div>

            {/* Row 7 */}
            <div className="flex items-start mt-1">
              <div className="w-[30px] text-[14px]">7.</div>
              <div className="w-[200px] font-bold text-[14px]">Verification Type</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span>
                <span>{data.verificationType}</span>
              </div>
            </div>

            {/* Row 8 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">8.</div>
              <div className="w-[200px] font-bold text-[14px]">Date of report generation</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span>
                <span>{formatDate(data.reportDate)}</span>
              </div>
            </div>

            {/* Row 9 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">9.</div>
              <div className="w-[200px] font-bold text-[14px]">Purpose</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.purpose}</span>
              </div>
            </div>

            {/* Row 10 */}
            <div className="flex items-start">
              <div className="w-[30px] text-[14px]">10.</div>
              <div className="w-[200px] font-bold text-[14px]">Verified by</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span>
                <span>{data.verifiedBy}</span>
              </div>
            </div>

          </div>

          {/* Statement */}
          <div className="mt-8 text-[13px] text-justify leading-[1.5]">
            No criminal records has been found against <span className="font-bold">Mr./Mrs./Ms. {data.applicantName}</span> , since 1995 to till date {formatDate(data.reportDate)} in CCIS and Police IT database available with Karnataka Police. The above person is residing at above mentioned <span className="font-bold">"Verified address"</span>.
          </div>

          {/* Validity Note */}
          <div className="mt-6 text-[13px] font-bold">
            NOTE: This Certificate is valid for one year from {formatDate(data.reportDate)} .
          </div>

          {/* Footer Section (QR & Signature) */}
          <div className="mt-auto flex justify-between items-end pb-[20px]">
            
            {/* QR Code - 160px x 160px, 20px margin from borders (handled by parent padding + self margin if needed) */}
            <div className="w-[160px] h-[160px] border-[1px] border-black p-1 flex items-center justify-center">
              <QRCodeCanvas value={qrValue} size={150} />
            </div>

            {/* Signature Block */}
            <div className="text-right flex flex-col items-end text-[13px] leading-[1.4]">
              <div className="font-bold mb-2">Signature</div>
              
              <div className="mb-2">
                Digitally signed by {data.verifiedBy.split(',')[0]}<br/>
                Date: {signatureDate}
              </div>

              <div className="font-bold">
                ACP, City SB<br/>
                {data.city}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
});

Certificate.displayName = 'Certificate';
