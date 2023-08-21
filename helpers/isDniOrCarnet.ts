import moment from 'moment';
export const isDniOrCarnet = (value: string) => {
    const dniRegex = /^[0-9]{8}$/;
    const carnetRegex = /^[0-9]{12}$/;
    
    if (!(dniRegex.test(value) || carnetRegex.test(value))) {
        throw new Error('El valor debe ser un DNI o un carné de extranjería válido.');
    }
    
    return true;
}

export const customDate = (value: string) => {
    if (!moment(value, 'DD/MM/YYYY').isValid()) {
      throw new Error('El valor debe ser una fecha válida en formato DD/MM/YYYY.');
    }
    return true;
}