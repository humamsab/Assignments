export const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg bg-blue-800 text-white placeholder-gray-400 outline-none"
    />
  )
}
