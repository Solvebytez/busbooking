import { parse, format } from 'date-fns';

interface DateFormatterProps {
  dateString: string;
}

export function DateFormatter({ dateString }: DateFormatterProps) {   
  // Parse the date using the correct format
  const date = parse(dateString, 'yyyy-MM-dd', new Date());

  // Format the date to 'dd MMM'
  const formattedDate = format(date, 'dd MMM');

  return <span>{formattedDate}</span>;
}

