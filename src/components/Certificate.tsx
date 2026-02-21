import React, { forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { CertificateData } from '../types';

interface CertificateProps {
  data: CertificateData;
}

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(({ data }, ref) => {
  // Karnataka Police Logo URL (using a placeholder that looks official or a generic one if specific not found)
  // I will use a generic shield or try to find the specific one. 
  // For now, let's use a placeholder that we can replace or a generic emblem.
  // Actually, I'll try to construct the header to look as close as possible.
  
  const qrData = JSON.stringify({
    appNo: data.applicationNumber,
    name: data.applicantName,
    date: data.reportDate,
    id: "VERIFIED-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  });

  return (
    <div ref={ref} id="certificate-preview" className="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto relative text-black font-sans box-border">
      {/* Outer Border */}
      <div className="h-full w-full border-4 border-gray-600 p-1 relative flex flex-col justify-between">
        <div className="h-full w-full border border-gray-400 p-6 flex flex-col relative">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-1/4"></div> {/* Spacer for centering logic if needed, but layout shows logo center */}
            
            <div className="flex flex-col items-center justify-center w-1/2">
               {/* Logo Placeholder - In a real app, use the actual asset */}
               <div className="w-20 h-20 mb-2 relative flex items-center justify-center">
                  <img 
                    src="https://i.postimg.cc/9MfTRTD5/kar-main-logo.png" 
                    alt="Karnataka State Police" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('bg-gray-200', 'rounded-full');
                      // Add a fallback icon via DOM manipulation or just let the alt text show? 
                      // Better to just hide it and show a text fallback or nothing.
                    }}
                  />
               </div>
               <h1 className="text-lg font-bold text-center leading-tight">Government of Karnataka<br/>(Police Department)</h1>
            </div>

            <div className="w-1/4 text-right text-sm font-medium leading-snug">
              Office of the<br/>
              Commissioner of Police<br/>
              {data.city}<br/>
              {data.state}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-400 mb-4"></div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold underline decoration-1 underline-offset-4">POLICE VERIFICATION CERTIFICATE</h2>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col gap-3 text-sm">
            
            {/* Row 1 */}
            <div className="flex">
              <div className="w-[5%]">1.</div>
              <div className="w-[35%] font-medium">Application Number</div>
              <div className="w-[60%]">: {data.applicationNumber}</div>
            </div>

            {/* Row 2 */}
            <div className="flex">
              <div className="w-[5%]">2.</div>
              <div className="w-[35%] font-medium">Applicant Name</div>
              <div className="w-[60%] uppercase">: {data.applicantName}</div>
            </div>

            {/* Row 3 */}
            <div className="flex">
              <div className="w-[5%]">3.</div>
              <div className="w-[35%] font-medium">Father's/ Husband's<br/>Name</div>
              <div className="w-[60%] uppercase flex items-center">: {data.fatherName}</div>
            </div>

            {/* Row 4 */}
            <div className="flex mt-2">
              <div className="w-[5%]">4.</div>
              <div className="w-[35%] font-medium">Verified Address</div>
              <div className="w-[60%] uppercase leading-relaxed">
                <span className="mr-1">:</span>
                {data.verifiedAddress}
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex mt-2 items-center">
              <div className="w-[5%]">5.</div>
              <div className="w-[35%] font-medium">Period of Stay at<br/>Present Address</div>
              <div className="w-[60%] flex items-center justify-between pr-10">
                <span className="font-bold">From Date: <span className="font-normal">{data.fromDate}</span></span>
                <span className="font-bold">To Date: <span className="font-normal">{data.toDate}</span></span>
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex mt-2">
              <div className="w-[5%]">6.</div>
              <div className="w-[35%] font-medium">Permanent Address</div>
              <div className="w-[60%] text-xs uppercase leading-relaxed">
                <span className="mr-1 text-sm">:</span>
                {data.permanentAddress}
              </div>
            </div>

            {/* Row 7 */}
            <div className="flex mt-2">
              <div className="w-[5%]">7.</div>
              <div className="w-[35%] font-medium">Verification Type</div>
              <div className="w-[60%]">: {data.verificationType}</div>
            </div>

            {/* Row 8 */}
            <div className="flex">
              <div className="w-[5%]">8.</div>
              <div className="w-[35%] font-medium">Date of report<br/>generation</div>
              <div className="w-[60%] flex items-center">: {data.reportDate}</div>
            </div>

            {/* Row 9 */}
            <div className="flex">
              <div className="w-[5%]">9.</div>
              <div className="w-[35%] font-medium">Purpose</div>
              <div className="w-[60%] uppercase">: {data.purpose}</div>
            </div>

            {/* Row 10 */}
            <div className="flex">
              <div className="w-[5%]">10.</div>
              <div className="w-[35%] font-medium">Verified by</div>
              <div className="w-[60%]">: {data.verifiedBy}</div>
            </div>

          </div>

          {/* Statement */}
          <div className="mt-8 text-sm text-justify leading-relaxed">
            No criminal records has been found against &nbsp;
            <span className="font-bold">Mr./Mrs./Ms. {data.applicantName}</span> , since 1995 to till date {data.reportDate} in CCIS and Police IT database available with Karnataka Police. The above person is residing at above mentioned <span className="font-bold">"Verified address"</span>.
          </div>

          {/* Validity Note */}
          <div className="mt-4 text-sm font-bold">
            NOTE: This Certificate is valid for one year from &nbsp; {data.reportDate} .
          </div>

          {/* Footer Section (QR & Signature) */}
          <div className="mt-auto pt-10 flex justify-between items-end">
            
            {/* QR Code */}
            <div className="border border-black p-1">
              <QRCodeCanvas value={qrData} size={120} />
            </div>

            {/* Signature Block */}
            <div className="text-right flex flex-col items-end">
              <div className="h-16"></div> {/* Space for signature image if needed */}
              <div className="font-medium mb-4">Signature</div>
              
              <div className="text-[10px] text-gray-600 mb-2">
                Digitally signed by {data.verifiedBy.split(',')[0]}<br/>
                Date: {new Date().toISOString().replace('T', ' ').substring(0, 19)} +05:30
              </div>

              <div className="font-bold text-sm">
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
