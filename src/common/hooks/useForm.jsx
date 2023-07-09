import { useState } from 'react';

export const useForm = (initialFValues) => {
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return {
    values,
    setValues,
    handleInputChange
  };
};
