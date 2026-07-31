function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="field-error">
      {message}
    </span>
  );
}

function FormField({ id, label, error, ...inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default FormField;
