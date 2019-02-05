import React from 'react';
import Select from 'react-select';

const RenderSelect = ({ options, input, meta: { touched, error } }) => {
  const { value, onBlur } = input;
  return (
    <>
      <Select
        {...input}
        onBlur={() => onBlur(value)}
        options={options}
      />
      {touched && (error && <small className="form-text text-mute text-danger">{error}</small>)}
    </>
  );
};

export default RenderSelect;
