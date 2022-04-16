import { parseISO, format } from 'date-fns';
// formatar data de iso para o padrão BR
const formatDate = (date, onlyDatePattern = true, pattern) => {
  // transformar para iso
  if (typeof date === 'string') date = parseISO(date);

  // foi passado algum outro padrão diferente ?
  if (pattern) {
    return format(date, pattern);
  }

  // caso contrário, usar os padrões
  if (onlyDatePattern) {
    // retornar formato com data apenas (dia/mes/ano)
    return format(date, 'dd/MM/yyyy');
  }

  // retornar formato com hora
  return format(date, 'dd/MM/yyyy - HH:mm');
};

export default formatDate;
