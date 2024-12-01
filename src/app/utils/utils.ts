// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatDate(dateString:any) {
  console.log("dateString",!dateString)
    // Handle format: November-29th-2024
    if(!dateString)return undefined;
  if (dateString.includes("-")) {
    dateString = dateString
      .replace(/(\d{1,2})(st|nd|rd|th)/, '$1') // Remove suffixes (st, nd, rd, th)
      .replace("-", " "); // Replace "-" with space for month parsing

    return new Date(dateString);
  }
 
  
  // Handle format: 15-11-2024
  const [day, month, year] = dateString.split("-");
  return new Date(`${year}-${month}-${day}`);
  }