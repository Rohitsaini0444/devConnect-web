/**
 * Reusable FormField component for consistent form validation display
 */

export const FormField = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  hint,
  rows,
  options,
  className = '',
}) => {
  const isError = touched && error;
  const baseInputClass = `input input-bordered w-full ${isError ? 'input-error' : ''}`;
  const baseSelectClass = `select select-bordered w-full ${isError ? 'select-error' : ''}`;
  const baseTextareaClass = `textarea textarea-bordered w-full resize-none ${isError ? 'textarea-error' : ''}`;

  return (
    <div className={className}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
          {isError && <span className="label-text-alt text-error text-xs">{error}</span>}
        </div>

        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows || 4}
            className={baseTextareaClass}
          />
        ) : type === 'select' ? (
          <select
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseSelectClass}
          >
            <option value="">Select {label}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={baseInputClass}
          />
        )}

        {hint && (
          <div className="label">
            <span className="label-text-alt text-xs opacity-75">{hint}</span>
          </div>
        )}
      </label>
    </div>
  );
};

export const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="alert alert-error mb-4 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2m2 2h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-sm btn-ghost"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export const SuccessToast = ({ message }) => {
  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <button
      disabled={isLoading}
      {...props}
      className={`btn btn-primary w-full ${props.className || ''}`}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
