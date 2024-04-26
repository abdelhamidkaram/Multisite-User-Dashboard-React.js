const TextButton = ({ text  , ClickHandler}) => {
  return (
    <button  onClick={ClickHandler} className="py-2 px-4 rounded-md text-blue-light font-bold ">
      {text}
    </button>
  );
};

export default TextButton;
