import React from 'react'
import Spinner from './Spinner'

interface ButtonProps {
  children: React.ReactNode; // Correct type for children
  type: "button" | "submit" | "reset"; // Can be 'button', 'submit', or 'reset'
  fn?: () => void; // The function to be executed when the button is clicked
  loading?: boolean;
  disabled?: boolean;
  style: "danger" | "nobg" | "primary" | "reverse" | "secondary" | "disabled" | "tertiary";
  css?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  fn,
  loading,
  disabled,
  style,
  css,
}) => {
  return (
    <button
      onClick={fn}
      disabled={loading || disabled} // Disable the button when loading or manually disabled
      type={type}
      className={`flex h-12 items-center justify-center whitespace-nowrap rounded-[939.53px] px-[16.29px] py-[9.55px] text-[16px] font-medium duration-150 ${css} ${
        style === 'danger' && 'bg-[#CC1818] text-white'
      } ${
        style === 'nobg' && 'bg-white text-primary border-[1px] border-[#00000066]'
      } ${
        style === 'primary' && 'bg-primary text-text-strongInverse'
      } ${
        style === 'secondary' && 'bg-fill-blueStrong text-text-strongInverse'
      } ${
        style === "disabled" && "bg-[#0000001A] text-text-strongInverse"
      } ${style === "reverse" && "border-[0.81px] border-stroke-strong bg-fill-weakerInverse hover:bg-[#00000066] hover:shadow-raised"} ${
        style === "tertiary" && "bg-[#9327DB] text-text-strongInverse"
      }`} // Add your button styles here
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

export default Button
