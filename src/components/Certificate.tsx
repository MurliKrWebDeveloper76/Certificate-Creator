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
      {/* Main Container with Border */}
      <div className="h-full w-full p-[15px]">
        <div className="h-full w-full border-[2px] border-gray-600 relative flex flex-col p-[20px]">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-2">
            {/* Left Spacer */}
            <div className="w-[200px]"></div> 
            
            {/* Center: Logo and Gov Text */}
            <div className="flex flex-col items-center justify-center -mt-2">
               <div className="w-[80px] h-[80px] mb-1 relative flex items-center justify-center">
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
                      <Shield className="w-[60px] h-[60px] text-[#1f2937]" />
                    </div>
                  )}
               </div>
               <h1 className="text-[16px] font-bold text-center leading-tight text-black">
                 Government of Karnataka<br/>(Police Department)
               </h1>
            </div>

            {/* Right: Office Address */}
            <div className="text-right text-[12px] font-normal leading-tight w-[200px] pt-2">
              Office of the<br/>
              Commissioner of Police<br/>
              {data.city}<br/>
              {data.state}
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-gray-400 mb-2"></div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-[16px] font-bold uppercase underline decoration-1 underline-offset-2 text-black">
              POLICE VERIFICATION CERTIFICATE
            </h2>
          </div>

          {/* Photo Section - Absolute positioned */}
          {data.photoUrl && (
            <div className="absolute right-[25px] top-[160px] w-[100px] h-[120px] bg-gray-100 z-10">
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
          <div className="flex flex-col gap-[12px] text-[12px] leading-tight relative pr-[110px]">
            
            {/* Row 1 */}
            <div className="flex items-start">
              <div className="w-[20px]">1.</div>
              <div className="w-[160px]">Application Number</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span> 
                <span>{data.applicationNumber}</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start">
              <div className="w-[20px]">2.</div>
              <div className="w-[160px]">Applicant Name</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.applicantName}</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-start">
              <div className="w-[20px]">3.</div>
              <div className="w-[160px]">Father's/ Husband's<br/>Name</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.fatherName}</span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex items-start">
              <div className="w-[20px]">4.</div>
              <div className="w-[160px]">Verified Address</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span className="leading-snug">{data.verifiedAddress}</span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex items-start mt-2">
              <div className="w-[20px]">5.</div>
              <div className="w-[160px]">Period of Stay at<br/>Present Address</div>
              <div className="flex-1">
                 <div className="flex justify-between w-full max-w-[400px]">
                   <div className="flex">
                      <span className="mr-2 font-normal">From Date:</span>
                      <span>{formatDate(data.fromDate)}</span>
                   </div>
                   <div className="flex">
                      <span className="mr-2 font-normal">To Date:</span>
                      <span>{formatDate(data.toDate)}</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex items-start mt-2">
              <div className="w-[20px]">6.</div>
              <div className="w-[160px]">Permanent Address</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span className="leading-snug">{data.permanentAddress}</span>
              </div>
            </div>

            {/* Row 7 */}
            <div className="flex items-start mt-1">
              <div className="w-[20px]">7.</div>
              <div className="w-[160px]">Verification Type</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span>
                <span>{data.verificationType}</span>
              </div>
            </div>

            {/* Row 8 */}
            <div className="flex items-start">
              <div className="w-[20px]">8.</div>
              <div className="w-[160px]">Date of report<br/>generation</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span>
                <span>{formatDate(data.reportDate)}</span>
              </div>
            </div>

            {/* Row 9 */}
            <div className="flex items-start">
              <div className="w-[20px]">9.</div>
              <div className="w-[160px]">Purpose</div>
              <div className="flex-1 flex uppercase">
                <span className="mr-2">:</span>
                <span>{data.purpose}</span>
              </div>
            </div>

            {/* Row 10 */}
            <div className="flex items-start">
              <div className="w-[20px]">10.</div>
              <div className="w-[160px]">Verified by</div>
              <div className="flex-1 flex">
                <span className="mr-2">:</span>
                <span>{data.verifiedBy}</span>
              </div>
            </div>

          </div>

          {/* Statement */}
          <div className="mt-6 text-[12px] text-justify leading-relaxed">
            No criminal records has been found against <span className="font-bold">Mr./Mrs./Ms. {data.applicantName}</span> , since 1995 to till date {formatDate(data.reportDate)} in CCIS and Police IT database available with Karnataka Police. The above person is residing at above mentioned <span className="font-bold">"Verified address"</span>.
          </div>

          {/* Validity Note */}
          <div className="mt-4 text-[12px] font-bold">
            NOTE: This Certificate is valid for one year from {formatDate(data.reportDate)}.
          </div>

          {/* Footer Section (QR & Signature) */}
          <div className="mt-auto flex justify-between items-end pb-4">
            
            {/* QR Code */}
            <div className="ml-2">
              <QRCodeCanvas value={qrValue} size={140} />
            </div>

            {/* Signature Block */}
            <div className="text-right flex flex-col items-end text-[11px] leading-tight">
              <div className="mb-4 text-[14px] font-normal">Signature</div>
              
              <div className="mb-2 text-gray-600">
                Digitally signed by {data.verifiedBy.split(',')[0]}<br/>
                Date: {signatureDate}
              </div>

              <div className="font-bold text-[13px]">
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
