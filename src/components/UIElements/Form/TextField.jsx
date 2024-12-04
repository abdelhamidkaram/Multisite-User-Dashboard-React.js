import { forwardRef } from 'react';
import InputError from "./InputError";

const TextField = forwardRef(({
  value,
  name,
  label,
  disable,
  isTextArea,
  type,
  register,
  error
}, ref) => {
  return (
    <div className="flex my-2 gap-1 items-center">
      <label className="w-24 md:w-36">
        <h3 className="text-md font-bold">{label}</h3>
      </label>
      {!isTextArea || null ? (
        <div className="w-full">
          <input
            ref={ref}
            className="border w-full md:w-3/4 shadow-sm focus:border-blue-light p-3 rounded-md"
            type={type != null ? type : "text"}
            defaultValue={value}
            disabled={disable}
            {...register}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              if (e.target.value < 0) {
                e.target.value = 0;
              }
            }}
          />
          <InputError error={error} />
        </div>
      ) : (
        <div className="w-full">
          <textarea
            ref={ref}
            className="border shadow-sm focus:border-blue-light w-full md:w-3/4 p-3 rounded-md"
            defaultValue={value}
            name={name}
            disabled={disable}
            {...register}
          />
          <InputError error={error} />
        </div>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
