import type { ReactElement } from "react";


interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyle = {
  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-200 text-purple-500"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"


export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps)  {
    return <button onClick={onClick} className={variantStyle[variant]+ " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}`}disabled={loading}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
    </button>
}

