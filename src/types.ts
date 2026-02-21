import React from 'react';

export interface CertificateData {
  applicationNumber: string;
  applicantName: string;
  fatherName: string;
  verifiedAddress: string;
  permanentAddress: string;
  fromDate: string;
  toDate: string;
  verificationType: string;
  reportDate: string;
  purpose: string;
  verifiedBy: string;
  designation: string;
  stationName: string;
  city: string;
  state: string;
  pincode: string;
}

export const initialData: CertificateData = {
  applicationNumber: 'P0832S940517263',
  applicantName: 'KAMLESH MAHTO',
  fatherName: 'ANGAG ROHIT MAHTO',
  verifiedAddress: '01 RAMANNA S S/O SHANKARAPPA KUVEMPU ROAD JARAGANAHALLI SHANKARAPPA COMPOUND JP NAGAR 6TH PHASE, Bengaluru City, Karnataka, 560078',
  permanentAddress: 'S/O ANGAG ROHIT MAHTO BINDGAWA, RAEPUR BINGANWAN, BANDHU CHHAPRA, Chhapra, Bhojpur, Bihar 802163',
  fromDate: '2026-02-09',
  toDate: '2026-02-13',
  verificationType: 'Application for Job Verification',
  reportDate: '2026-02-14',
  purpose: 'JOB PURPOSE',
  verifiedBy: 'SHO of, Hebbagodi PS',
  designation: 'Commissioner of Police',
  stationName: 'Hebbagodi PS',
  city: 'Bengaluru City',
  state: 'Karnataka',
  pincode: '560078'
};
