import  '../../../assets/css/form.css' ; 


const checkboxField = ({ name , endLabel, label , value , handleChange})=> {

  return (
    <label className="flex  items-center">
        <p className="  w-32 p-0 m-0 text-md font-bold  ">{label}</p>

      <input type="checkbox" checked={value} onChange={()=>{
        
        handleChange();
        
      }} value={value} name={name}/>
     <p className="  p-0 m-2 text-md ">{endLabel}</p>
     
    </label>
  );
};

export default checkboxField;
