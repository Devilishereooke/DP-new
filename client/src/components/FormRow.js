const FormRow = ({ type, name, value, handleChange, labelText, options }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {type === 'radio' ? (
        <div className="option-container" style={{display : "flex"}}>
        {options.map(option => (
          <div key={option} className="form-radio-option" style={{marginRight : "1.8rem"}}>
            <input
              type="radio"
              id={`${name}-${option}`}
              value={option}
              name={name}
              onChange={handleChange}
              checked={value === option}
              className="form-radio-input"
            />
            <label htmlFor={`${name}-${option}`} className="form-radio-label">
              {option}
            </label>
          </div>
        ))}
        </div>) : (
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
        />
      )}
    </div>
  );
};

export default FormRow;