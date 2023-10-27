import { InputComponentsI } from "@/Interface";


const InputComponents = ({
  id,
  label,
  placeHolder,
  onChange,
  value,
  type,
}: InputComponentsI) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id,e.target.value);
  };
  return (
    <>
      <div className="relative" key={id}>
        <p className="pt-0 pr-2 absolute pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
          {label}
        </p>
        <input
          placeholder={placeHolder}
          type={type || "text"}
          value={value}
          onChange={onChangeValue}
          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
      </div>
    </>
  );
};

export default InputComponents;
