function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="mt-1 block text-xs font-medium text-main field-error">
      {message}
    </span>
  );
}

function FormField({ id, label, error, ...inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-1"
        {...inputProps}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default FormField;
