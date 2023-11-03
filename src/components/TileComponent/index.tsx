const TileComponents = ({ data, selected = [], onClick }: any) => {
  return data && data.length ? (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-1 ">
        {data.map(({id,label}: any) => (
          <>
            <label className="cursor-pointer" key={id}>
              <span className="rounded-lg border border-black px-6 py-2 font-bold">
                {label}
              </span>
            </label>
          </>
        ))}
      </div>
    </>
  ) : null;
};
export default TileComponents