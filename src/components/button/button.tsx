import "./button.css";

const Button: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
