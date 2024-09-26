import { useRef, useState } from "react";
import MainButton from "./MainButton";
import DeleteIcon from "../../assets/icons/delete.svg";
import { $api, useData } from "../../client";
import PromiseToast from "./Toasts/PromiseToast";

const UploadImage = () => {
  const { mutate: mutate } = useData("wp-json/store/v1/media");

  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);



  const handleUploadImage = async () => {
    if (files.length === 0) {
      alert("No files selected for upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      let response ; 
      response =  $api.post("wp-json/store/v1/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      PromiseToast(
        response,
        "جاري رفع الصورة",
        "فشل رفع الصورة حاول لاحقا",
        "تم رفع الصورة بنجاح",
        ()=>{
          console.log(response.data);
          setFiles([]);
          mutate();
        }
      );
      
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => {
        setDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setFiles(Array.from(e.dataTransfer.files));
        console.log(files);
      }}
      className={`${dragOver ? "border-blue-light shadow-xl " : ""} '
      h-52 p-4
      overflow-auto 
      flex flex-col justify-center gap-6 
    bg-gray-100  rounded-md  shadow-md
      border-dashed border-2 border-blue-dark
   hover:border-blue-light hover:shadow-xl' `}
    >
      {files.length > 0 ? (
        <div className=" ">
          <ul className="max-h-28 overflow-y-scroll">
            {files.map((file, i) => (
              <li key={i}> {file.name}</li>
            ))}
          </ul>
          <hr />
          <div className=" mt-3 grid grid-flow-row  grid-cols-2 items-center">
            <MainButton
              className="col-end-3"
              ClickHandler={handleUploadImage}
              text={" رفع "}
            />
            <img
              onClick={() => {
                setFiles([]);
              }}
              src={DeleteIcon}
              className="  w-6 mx-5 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="opacity-50">اسحب الصور وأفلتها هنا من أجل رفعها </p>
          <hr />
          <button 
          className="bg-blue-light py-2 px-4 rounded-md text-white font-bold "
          onClick={(e)=>{
            inputRef.current.value = "";
            e.preventDefault();
             inputRef.current.click();
          }}>اختيار صورة</button>
         
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        multiple
        hidden
        onChange={(e) => {
          e.preventDefault();
          setFiles(Array.from(e.currentTarget.files));
        }}
      />
    </div>
  );
};

export default UploadImage;
