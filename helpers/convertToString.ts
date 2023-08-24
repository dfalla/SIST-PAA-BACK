export const convertToString = (value: string) => {
    if(value === 'false'){
      return 'no';
    }
  
    if(value === 'true'){
      return 'si';
    }
  }