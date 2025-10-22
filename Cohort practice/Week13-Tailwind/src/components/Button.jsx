export const Button = ({ disabled, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
        disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-[#3be2cb] text-black hover:bg-[#2bc6ad]"
      }`}
    >
      {children}
    </button>
  )
}
