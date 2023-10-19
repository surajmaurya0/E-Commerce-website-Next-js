interface InputComponents {
  label: string;
  placeHolder: string;
  onChange: () => void;
  value: string;
  type: string;
}

const InputComponents = ({
  label,
  placeHolder,
  onChange,
  value,
  type,
}: InputComponents) => {
  return (
    <>
      <div className="relative">
        <p className="pt-0 pr-2 pl-2 mt-3 mr-0 mb-2 ml-2 font-medium text-gray-600">
          {label}
        </p>
        <input
          placeholder={placeHolder}
          type={type || "text"}
          value={value}
          onChange={onChange}
          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded"
        />
      </div>
    </>
  );
};

export default InputComponents;
