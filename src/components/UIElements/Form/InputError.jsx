
const InputError = ({ error }) => {
  return (
    <div>
      {
        <p className={`${error == null ? "hidden" : "block "} error`}>
          {error}
        </p>
      }
    </div>
  );
};

export default InputError;
