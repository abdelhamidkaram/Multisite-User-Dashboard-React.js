import InputError from "./InputError";

const TextField = ({
  value,
  name,
  label,
  disable,
  isTextArea,
  type,
  register,
  error,
  ref
}) => {
  return (
      <div className="flex my-2  gap-1 items-center ">
        <label className="w-36">
          <h3 className="text-md font-bold  ">{label}</h3>
        </label>
        {!isTextArea || null ? (
          <div className="w-full">
          <input
             ref={ref}
            className="border  w-3/4 shadow-sm focus:border-blue-light p-3 rounded-md "
            type={type != null ? type : "text"}
            defaultValue={value}
            disabled={disable}
            {...register}
          />
          
          <InputError  error={error}/>

          </div>
        ) : (
          <div className="w-full">
          <textarea
            className="border shadow-sm focus:border-blue-light w-3/4 p-3 rounded-md "
            defaultValue={value}
            name={name}
            disabled={disable}
            {...register}
          />
          <InputError error={error}/>

        </div>
        )
      
      }

      </div>

  );
};

export default TextField;
