interface SelectComponents {
  label: string;
  value: string;
  onChange: () => void;
  options: any;
}

const SelectComponents = ({
  label,
  value,
  onChange,
  options,
}: SelectComponents) => {
  return (
    <>
      <div className="realtive">
        <p className="pt-0 pr-2 pl-2 mt-3 mr-0 mb-2 ml-2 font-medium text-gray-600">
          {label}
        </p>
        <select
          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded"
          // name=""
          //   id=""
          aria-label="State"
          value={value}
          onChange={onChange}
        >
          {options && options.length ? (
            options.map((optionItem: any) => (
              <option
                key={optionItem.id}
                value={optionItem.id}
                id={optionItem.id}
              >
                {optionItem.label}
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
