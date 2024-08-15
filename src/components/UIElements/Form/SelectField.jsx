import InputError from "./InputError";

const SelectField = ({ ref , value, name, label, register, error, items }) => {
  return (
    <div className="flex my-8  gap-2 items-center ">
      <label className="w-36">
        {" "}
        <h3 className="text-md font-bold  ">{label}</h3>
      </label>

      <div className="w-full">
        <select
          ref={ref}
          className="border w-full md:w-3/4 shadow-sm focus:border-blue-light p-3 rounded-md "
          name={name}
          defaultValue={value}
          {...register}
        >
        <option value={value} disabled hidden>{value}</option>
          {items.map((item, i) => {
            return <option value={item} key={i}>{item}</option>;
          })}
        </select>
        <InputError error={error}/>
      </div>
    </div>
  );
};

export default SelectField;
