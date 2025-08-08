interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  isRequired,
  type = "text",
}) => {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <label htmlFor={inputId}>{label}: </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
        id={inputId}
      />
    </div>
  );
};

export default Input;
