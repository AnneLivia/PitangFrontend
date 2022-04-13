import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setMinutes, setHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AppointmentDatePicker = ({ date, onChange, ...rest }) => {
  return (
    <DatePicker
      selected={date}
      onChange={onChange}
      minTime={setHours(setMinutes(new Date(), 0), 0)}
      maxTime={setHours(setMinutes(new Date(), 0), 23)}
      timeIntervals={60}
      locale={ptBR}
      {...rest}
    />
  );
};

export default AppointmentDatePicker;
