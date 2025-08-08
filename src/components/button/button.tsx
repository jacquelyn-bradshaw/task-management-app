import "./button.css";

const Button: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button
      data-testid={`${text.toLowerCase()}-button`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
