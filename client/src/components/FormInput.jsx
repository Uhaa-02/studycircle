function FormInput({ label, type = 'text', value, onChange, required = false, placeholder }) {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default FormInput;