const TileComponents = ({ data, selected = [], onClick }: any) => {

  return data && data.length ? (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-1 ">
        {data.map(( dataItem : any) => (
          <>
            <label
              className='cursor-pointer'
              key={dataItem.id}
              onClick={() => onClick(dataItem)}
            >
              <span className={`rounded-lg border border-black px-6 py-2 font-bold ${
                selected &&
                selected.length &&
                selected.map((item: any) => item.id).indexOf(dataItem.id) !== -1
                  ? "bg-black text-white"
                  : ""
              }`}>
                {dataItem.label}
              </span>
            </label>
          </>
        ))}
      </div>
    </>
  ) : null;
};
export default TileComponents;
