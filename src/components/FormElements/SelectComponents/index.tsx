import { SelectComponentsI } from "@/Interface";
const SelectComponents = ({
  id,
  label,
  value,
  onChange,
  options,
}: SelectComponentsI) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(id, e.target.value);
  };
  return (
    <>
      <div className="realtive">
        <p className="pt-0 pr-2 pl-2 absolute -mt-3 mr-0 mb-2 ml-2 font-medium text-gray-600 bg-white">
          {label}
        </p>
        <select
          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded"
      
          aria-label="State"
          value={value}
          onChange={onChangeValue}
        >
          {options && options.length ? (
            options.map(({ id, label}: any) => (
              <option key={id} value={id} id={id}>
                {label}
              </option>
            ))
          ) : (
            <option id="" value="">
              select
            </option>
          )}
        </select>
      </div>
    </>
  );
};
export default SelectComponents;
