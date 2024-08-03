function Input({ name = "input", placeholder = "input", type = "text" }) {
  return (
    <div>
      <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
        Product Name
      </span>
      <input
        type={type}
        name={name}
        id=""
        placeholder={placeholder}
        className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
      />
    </div>
  );
}

export default Input;
