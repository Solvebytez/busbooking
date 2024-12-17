/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image as PDFImage, Font, BlobProvider } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { FileDown } from 'lucide-react'

// Register Noto Sans Kannada font for proper Kannada text rendering
Font.register({
  family: 'NotoSansKannada',
  src: "/fonts/NotoSansKannada-Regular.ttf", // Path to the font file
})

// Register Noto Sans for English text
Font.register({
  family: 'NotoSans',
  src: 'https://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNb4g.ttf',
})

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'NotoSansKannada',
  },
  header: {
    backgroundColor: '#004AAD',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:'5',
    marginTop:10
  },
  headerTitle: {
    color: 'white',
    fontSize: 10, /* Reduced font size */
    fontWeight: 'bold',
  },
  headerRight: {
    color: 'white',
    fontSize: 10, /* Reduced font size */
  },
  corporateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  corporateInfo: {
    flex: 1,
    marginLeft: 10,
  },
  corporateTitle: {
    color: '#004AAD',
    fontSize: 12, /* Reduced font size */
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 6, /* Reduced font size */
    color: '#4B5563',
    marginBottom: 2,
  },
  website: {
    fontSize: 6, /* Reduced font size */
    color: '#2563EB',
  },
  qrCode: {
    width: 60,
    height: 60,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
    gap: 20, // Add space between columns
  },
  detailsColumn: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row', // Keep label and value on the same line
    marginBottom: 5,
    alignItems: 'center', // Align items vertically
  },
  label: {
    fontWeight: 'bold',
    fontSize: 7,
    width: '50%', // Fixed width for labels
    paddingRight: 4,
  },
  value: {
    fontSize: 7,
    flex: 1, // Take remaining space
  },
  sectionTitle: {
    fontSize: 9, /* Reduced font size */
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 5,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    flex: 1,
    fontSize: 6, /* Reduced font size */
  },
  fareBreakup: {
    marginBottom: 15,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 7, /* Reduced font size */
  },
  totalFare: {
    fontWeight: 'bold',
    borderTop:'1',
    borderBottomColor: '#E5E7EB',
    paddingTop:8
  },
  notes: {
    fontSize: 5, /* Reduced font size */
    color: '#4B5563',
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  bulletList: {
    paddingLeft: 10,
  },
  bulletPoint: {
    marginBottom: 6,
    fontSize: 7, /* Reduced font size */
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  kannadaText: {
    fontFamily: 'NotoSansKannada',
    fontSize: 7, /* Reduced font size */
    lineHeight: 1.4,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  englishText: {
    fontFamily: 'NotoSans',
    fontSize: 7, /* Reduced font size */
    lineHeight: 1.4,
    marginBottom: 8,
  },
  heading: {
    fontSize: 10, /* Reduced font size */
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>{label}</Text>
    <Text style={styles.tableCell}>{value}</Text>
  </View>
);



// PDF Document component
const TicketDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Text style={[styles.kannadaText, styles.headerTitle]}>ಪ್ರಯಾಣ ಟಿಕೇಟು ವಿವರಗಳು / Onward Journey Ticket Details</Text>
        <Text style={styles.headerRight}>e-Ticket Advance Reservation</Text>
      </View>

      {/* Corporate Header with Logo */}
      <View style={styles.corporateHeader}>
        <PDFImage src="/placeholder.svg" style={styles.logo} />
        <View style={styles.corporateInfo}>
          <Text style={styles.corporateTitle}>KARNATAKA STATE ROAD TRANSPORT CORPORATION</Text>
          <Text style={styles.address}>
            CENTRAL OFFICE, TRANSPORT HOUSE, K.H ROAD, BENGALURU - 560027, KARNATAKA, INDIA.
          </Text>
          <Text style={styles.website}>Homepage : www.sanchar6t.com</Text>
        </View>
        <PDFImage src="/placeholder.svg" style={styles.qrCode} />
      </View>

      {/* Journey Details */}
      <View style={styles.detailsContainer}>
    <View style={styles.detailsColumn}>
      <DetailRow label="ಪಿಎನ್‍ಆರ್ ಸಂ ಖ್ಯೆ / PNR No.:" value="KS5479792" />
      <DetailRow label="ಟ್ರಿಪ್ ಕೋಡ್ / Trip Code:" value="2215BNGSLY" />
      <DetailRow label="ಪ್ರಾರಂಭದ ಸ್ಥಳ / Start Place:" value="BENGALURU" />
      <DetailRow label="ನಿಗಮಣಾ ಸಮಯ / Departure Time:" value="22:25" />
      <DetailRow label="ಅಂತಿಮ ಸ್ಥಳ / End Place:" value="KUKKESUBRAMANYA" />
      <DetailRow label="ಒಟ್ಟು ಸೀಟುಗಳು / Total Seats:" value="2 (Adults: 2 Children: 0)" />
      <DetailRow label="Txn. ಪಾಸ್‌ವರ್ಡ್ / Txn. Password:" value="9183" />
      <DetailRow label="OB ಸಂ. ಸಂಖ್ಯೆ / OB Ref. No.:" value="OB75804893" />
    </View>
    <View style={styles.detailsColumn}>
      <DetailRow label="ಸ್ಥಿತಿ / Status:" value="CONFIRMED" />
      <DetailRow label="ಪ್ರಯಾಣದ ದಿನಾಂಕ / Date of Journey:" value="09-Dec-2024" />
      <DetailRow label="ಸೇವೆಯ ವರ್ಗ / Service Category:" value="NON AC SLEEPER" />
      <DetailRow label="ಪಿಕಪ್ ಪಾಯಿಂಟ್ / Pickup Point:" value="NAVARANG PARK 9008752232" />
      <DetailRow label="ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಸಂಖ್ಯೆ / Platform No.:" value="PARK" />
      <DetailRow label="ಡ್ರಾಪಿಂಗ್ ಪಾಯಿಂಟ್ / Dropping Point:" value="KUKKESUBRAMANYA" />
      <DetailRow label="ಸೇವೆಯ ಸ್ಥಿತಿ / Service Status:" value="Operation" />
      <DetailRow label="ಬ್ಯಾಂಕ್ ಹೆಸರು / Bank Name:" value="Razorpay" />
    </View>
  </View>


      {/* Passenger Details */}
      <View style={styles.table}>
        <Text style={styles.sectionTitle}>ಪ್ರಯಾಣಿಕರ ವಿವರಗಳು / Onward Trip Passenger Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>ಆಸನ ಸಂಖ್ಯೆ / Seat No.</Text>
          <Text style={styles.tableCell}>ಪ್ರಯಾಣಿಕರ ಹೆಸರು / Passenger Name</Text>
          <Text style={styles.tableCell}>ವಯಸ್ಸು / Age</Text>
          <Text style={styles.tableCell}>ವಯಸ್ಕರು / ಮಕ್ಕಳು Gender</Text>
          <Text style={styles.tableCell}>ರಿಯಾದಿ ವಿಧ / Concession Type</Text>
          <Text style={styles.tableCell}>ರಾಷ್ಟ್ರೀಯತೆ / Nationality</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>7</Text>
          <Text style={styles.tableCell}>Dhananjaya B R</Text>
          <Text style={styles.tableCell}>47</Text>
          <Text style={styles.tableCell}>Male</Text>
          <Text style={styles.tableCell}>GENERAL PUBLIC</Text>
          <Text style={styles.tableCell}>Indian</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>8</Text>
          <Text style={styles.tableCell}>Nagarathna k n</Text>
          <Text style={styles.tableCell}>38</Text>
          <Text style={styles.tableCell}>Female</Text>
          <Text style={styles.tableCell}>GENERAL PUBLIC</Text>
          <Text style={styles.tableCell}>Indian</Text>
        </View>
      </View>

      {/* Fare Details */}
      <View style={styles.fareBreakup}>
        <Text style={styles.sectionTitle}>ಪ್ರಯಾಣ ದರದ ವಿವರ / Onward Trip Fare Breakup</Text>
        <View style={styles.fareRow}>
          <Text>ಮೂಲ ದರ / Basic Fare</Text>
          <Text>₹1472</Text>
        </View>
      
        <View style={styles.fareRow}>
          <Text>ರಿಯಾಯಿತಿ / GST</Text>
          <Text>₹88</Text>
        </View>
        <View style={[styles.fareRow, styles.totalFare]}>
          <Text>ಒಟ್ಟು ಪ್ರಯಾಣ ದರ / Total Fare</Text>
          <Text>₹1600</Text>
        </View>
      </View>

      {/* Updated Notes Section */}
   <IDProofSection />
      <ImportantInformation />
    </Page>
  </Document>
)

const IDProofSection = () => (
  <View style={styles.section}>
    <Text style={styles.heading}>ಗುರುತಿನ ಚೀಟಿ ಸೂಚನೆ / ID Proof Note</Text>
    
    <View style={styles.bulletList}>
      <Text style={styles.kannadaText}>
        • ಇ-ಟಿಕೇಟ್ ಕಾಯ್ದಿರಿಸಿದ ಪ್ರಯಾಣಿಕರ ಪೈಕಿ ಒಬ್ಬರು ಪ್ರಯಾಣದ ಸಮಯದಲ್ಲಿ ಪ್ರಸ್ತುತಪಡಿಸಬೇಕಾದ ಮಾನ್ಯವಾದ ಗುರುತಿನ ಚೀಟಿಗಳು:- ಚಾಲನಾ ಪರವಾನಗಿ, ಚುನಾವಣೆ ಗುರುತಿನ ಚೀಟಿ, ಪಾನ್ಕಾರ್ಡ್, ಪಾಸ್ಪೋರ್ಟ್, ಆಧಾರ್ ಕಾರ್ಡ್, ರೇಷನ್ ಕಾರ್ಡ್, ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ, ಪ್ರಯಾಣಿಕರ ಫೋಟೋ ಸಹಿತ ಗುರುತಿನ ಚೀಟಿಯ ಮೂಲ ಅಥವಾ ಛಾಯಾಪ್ರತಿ
      </Text>
      
      <Text style={styles.englishText}>
        • Valid IDs to be presented during journey by one of the passenger booked on an e-ticket:- Driving License, Voter Identity Card, PAN Card, Passport, Aadhar, Ration Card, Senior Citizen card with photograph /Original Identity Card issued by the Government Departments with photo / Original with Photo identification card issued by Private Companies/ Original with photo Identity Card issued by the Education Institutions/ Original with Photo debit / credit cards/ Aadhaar, PAN Card and Driving License Identity (Soft Copy) presented through Digilocker App considered as valid proof of identity.
      </Text>
    </View>
  </View>
)

const ImportantInformation = () => (
  <View style={styles.section}>
    <Text style={styles.heading}>ವಿಶೇಷ ಸೂಚನೆಗಳು / Important Information</Text>
    
    <View style={styles.bulletList}>
      <Text style={styles.kannadaText}>
        • ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ www.ksrtc.in ನಲ್ಲಿನ ಷರತ್ತು ಹಾಗೂ ನಿಬಂಧನೆಗಳನ್ನು ಅವಲೋಕಿಸಬಹುದಾಗಿದೆ.
      </Text>
      <Text style={styles.englishText}>
        • For details, rules and terms & conditions of E-Ticketing, please visit www.ksrtc.in
      </Text>
      
      <Text style={styles.kannadaText}>
        • ಈ ಟಿಕೇಟ್‍ನಲ್ಲಿ ಕಾಯ್ದಿರಿಸಿದ ಆಸನಗಳು ಇತರರಿಗೆ ವರ್ಗಾಯಿಸುವಂತಿಲ್ಲ.
      </Text>
      <Text style={styles.englishText}>
        • The seat(s) booked under this e-ticket/m-ticket is/are not transferable.
      </Text>
      
      <Text style={styles.kannadaText}>
        • ಇ-ಟಿಕೇಟ್/ಎಂ-ಟಿಕೇಟ್ ನಲ್ಲಿ ನಮೂದಿಸಿರುವ ನಿರ್ದಿಷ್ಟ ಆಸನ ಸಂಖ್ಯೆ ಮತ್ತು ಬಸ್ಸು ಸೇವೆಗೆ ಮಾತ್ರ ಮಾನ್ಯವಾಗಿರುತ್ತದೆ.
      </Text>
      <Text style={styles.englishText}>
        • This e-ticket/m-ticket is valid only for the seat number and bus service specified herein.
      </Text>
      
    </View>
    <View style={styles.bulletList}>
    <Text style={styles.kannadaText}>
      • ಪಯಾಣಿಕರು ಪುಯಾಣ ಸಮಯದಲ್ಲಿ ಇ-ಟಿಕೇಟ್/ಎಂ-ಟಿಕೇಟ್ ಹಾಗೂ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಇಟ್ಟುಕೊಳ್ಳಬೇಕು.
    </Text>
    <Text style={styles.englishText}>
      • Passenger shall keep the e-ticket/m-ticket safely till the end of the journey.
    </Text>

    <Text style={styles.kannadaText}>
      • ತಪಾಸಣೆ ಸಂದರ್ಭದಲ್ಲಿ ಇ-ಟಿಕೇಟ್/ಎಂ-ಟಿಕೇಟ್ ಹಾಗೂ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಕಡ್ಡಾಯವಾಗಿ ತೋರಿಸುವುದು.
    </Text>
    <Text style={styles.englishText}>
      • Passenger shall show the e-ticket/m-ticket and ID proof at the time of checking.
    </Text>

    <Text style={styles.kannadaText}>
      • ಹಿರಿಯ ನಾಗರಿಕರ ರಿಯಾಯಿತಿಯು ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಿವಾಸಿಗಳಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ ಮತ್ತು ಇತರೆ ರಾಜ್ಯದ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ. 
        ಹಿರಿಯ ನಾಗರಿಕರ ರಿಯಾಯಿತಿ ಪಡೆದು ಪುಯಾಣಿಸುತ್ತಿರುವ ಪುಯಾಣಿಕರು ಪುಯಾಣದ ಸಂದರ್ಭದಲ್ಲಿ ಇ-ಟಿಕೆಟ್/ಎಂ-ಟಿಕೆಟ್ ನ ಜೊತೆಗೆ ಈ ಕೆಳಗೆ
        ತಿಳಿಸಿರುವ ಯಾವುದಾದರೊಂದು ಮೂಲ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಕಡ್ಡಾಯವಾಗಿ ತೋರಿಸುವುದು. ಚಾಲನಾ ಪರವಾನಗಿ, ಚುನಾವಣೆ ಗುರುತಿನ ಚೀಟಿ,
        ಪಾನ್ ಕಾರ್ಡ್, ಪಾಸ್‌ಪೋರ್ಟ್, ಆಧಾರ್ ಕಾರ್ಡ್, ರೇಷನ್ ಕಾರ್ಡ್, ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ ಪ್ರಯಾಣಿಕರ ಫೋಟೋ
        ಸಹಿತ ಗುರುತಿನ ಚೀಟಿಯ ಮೂಲ ಅಥವಾ ಛಾಯಾ ಪ್ರತಿ/ ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳಿಂದ ಫೋಟೋ ಸಮೇತ ವಿತರಿಸಿರುವ ಮೂಲ ಗುರುತಿನ ಚೀಟಿ/
        ಕರ್ನಾಟಕ ರಾಜ್ಯ ರಸ್ತೆ ಸಾರಿಗೆ ನಿಗಮದಿಂದ ವಿತರಿಸಲ್ಪಟ್ಟ ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ/ ಡಿಜಿಲಾಕರ್ ಆಪ್ (Digilocker App) 
        ಮುಖಾಂತರ ಹಾಜರುಪಡಿಸುವ ಆಧಾರ್ ಕಾರ್ಡ್, ಪಾನ್‌ಕಾರ್ಡ್ ಹಾಗೂ ಚಾಲನಾ ಪರವಾನಗಿ ಗುರುತಿನ ಚೀಟಿ (ಸಾಫ್ಟ್ ಪ್ರತಿ).
    </Text>
    <Text style={styles.englishText}>
      • Senior Citizen concession is applicable for residents of Karnataka State only. Residents of other states are not entitled 
        for Senior Citizen concession. Passengers travelling with Senior Citizen concession need to produce any one of the 
        following Original ID proof at the time of journey - Driving License, Voter Identity Card, PAN Card, Passport, Aadhar, 
        Ration Card, Senior Citizen card with photograph /Original Identity Card issued by the Government Departments with photo/
        Senior citizen identity card issued by KSRTC / Aadhaar, PAN Card and Driving License Identity (Soft Copy) presented 
        through Digilocker App considered as valid proof of identity.
    </Text>

    <Text style={styles.kannadaText}>
      • ಮುದ್ರಿತ ಇ-ಟಿಕೇಟ್ ನೊಂದಿಗೆ ನಿಗದಿತ ಗುರುತಿನ ಚೀಟಿ ಹೊಂದಿರುವ ಪ್ರಯಾಣಿಕರು, ಸದರಿ ಸಾರಿಗೆ ಹೊರಡುವ ಎರಡು ಗಂಟೆ ಮುಂಚಿನ
        ಅವಧಿಯಲ್ಲಿ ನಗರ ಸಾರಿಗೆ ಸೌಲಭ್ಯವನ್ನು ಉಚಿತವಾಗಿ ಪಡೆಯಬಹುದು (ಹವಾನಿಯಂತ್ರಿತ ಸಾರಿಗೆಗಳನ್ನು ಹೊರತುಪಡಿಸಿ). ಮೊಬೈಲ್
        ಟಿಕೇಟ್ (SMS) ಆಧಾರದ ಮೇಲೆ ಉಚಿತ ನಗರ ಸಾರಿಗೆ ಸೌಲಭ್ಯವನ್ನು ನೀಡಲಾಗುವುದಿಲ್ಲ.
    </Text>
    <Text style={styles.englishText}>
      • Free Travel is permitted in City Buses (except A/C buses) within the City limits before 2 Hours of the departure time on
        production of e-ticket print-outs only. Free travel by showing m-ticket is not allowed.
    </Text>

    <Text style={styles.kannadaText}>
      • ಎಲ್ಲಾ ನಿರ್ಗಮನ / ಆಗಮನದ ಸಮಯಗಳು 24 ಗಂಟೆಯ ಸ್ವರೂಪದಲ್ಲಿರುತ್ತವೆ. ಅಂದರೆ 8:00 AM (ಬೆಳಿಗೆ) ಅನ್ನು 08:00 ಗಂಟೆಗಳು 
        ಮತ್ತು 8:00 PM (ರಾತ್ರಿ) ಅನ್ನು 20:00 ಗಂಟೆ ಎಂದು ನಮೂದಿಸಲಾಗುತ್ತದೆ.
    </Text>
    <Text style={styles.englishText}>
      • All departure/ arrival timings are in 24 hour format i.e 8:00 AM will be displayed as 08:00 hrs and 8:00 PM as 20:00 hrs.
    </Text>
  </View>
  </View>
)

const DownloadPDFLink = () => (
  <PDFDownloadLink document={<TicketDocument />} fileName="bus-ticket.pdf">
   <BlobProvider document={<TicketDocument />}>
      {({ blob,  loading, error }) => {
        // Do whatever you need with blob here
        if (loading) {
          return (
            <Button disabled>
              <FileDown className="mr-2 h-4 w-4" />
              Generating PDF...
            </Button>
          );
        }
  
        if (error) {
          return (
            <Button disabled>
              <FileDown className="mr-2 h-4 w-4" />
              Error generating PDF
            </Button>
          );
        }
  
        function saveAs(blob: Blob, arg1: string) {
          throw new Error("Function not implemented.")
        }

        return (
          <Button
            onClick={() => {
              if (blob) {
                saveAs(blob, 'bus-ticket.pdf');
              }
            }}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download Ticket
          </Button>
        );
      }}
    </BlobProvider>
  </PDFDownloadLink>
)

export default function BusTicketPDF() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <DownloadPDFLink />
    </div>
  )
}


