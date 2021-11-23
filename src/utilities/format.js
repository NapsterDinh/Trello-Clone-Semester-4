import parsePhoneNumber from 'libphonenumber-js';
import moment from 'moment';

export const formatCurrency = (value) => {
  if (value) {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '';
};

export const formatPhoneNumber = (phone) => {
  const phoneNumber = parsePhoneNumber(phone);
  return phoneNumber.formatNational();
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  return moment(dateString).format('DD/MM/YYYY');
};

export const validateEmail = (email) => {
  const re = /^.*@.*(\.\w{1,10})+$/;
  return re.test(String(email));
};

export const formatArray = (list) => {
  const _options = list.map((option) => ({
    value: option['id'],
    label: option['name'],
  }));

  return _options;
}

export const dateFormat1 = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
export const dateFormat2 = 'YYYY-MM-DDTHH:mm:ss.SS[Z]';
export const dateFormat3 = 'YYYY-MM-DDTHH:mm:ss[Z]';

export const getDateOFForm = (data, fm = null) => {
  if (moment(data, 'DD/MM/YYYY', true).isValid()) return data;
  if (
    fm && 
    (
      moment(data, dateFormat1, true).isValid() ||
      moment(data, dateFormat2, true).isValid() ||
      moment(data, dateFormat3, true).isValid()
    ) 
  ) {
    return formatDate(data);
  }
  const dateString = data && moment(data, 'DD-MM-YYYY', true).isValid() ? moment(data, 'DD-MM-YYYY').format(fm || 'DD/MM/YYYY') : '';
  return dateString;
}

export const filterMember = (members,filterList) => {
  if (filterList) {
    const idList = filterList.map((item) => {return item?.id});
    return members.filter(item => {return idList.includes(item?.id)});
  } else return members;
};