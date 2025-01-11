import { Fragment } from "react";
import SectionTitle from "../UIElements/SectionTitle";
import MainButton from "../UIElements/MainButton";
import { ShimmerTable } from "shimmer-effects-react";
import Pagination from "./Pagination";
import { BsEye } from "react-icons/bs";

const CustomTable = ({
  data,
  responseData,
  CustomHeader,
  ControllerComponent,
  title,
  editHandler,
  deleteHandler,
  showHandler,
  to,
  addBTNTitle,
  addBTNClickHandler,
  isLoading,
  totalPages,
  handlePageClick,
}) => {
  const buildItem = (data) => {
    return (data != null && data != undefined && data != [])
      ? data.map((item, i) => (
          <tr key={i}>
            {Object.keys(item ).map((key) => {
              const value = item[key];
              if (typeof value != "object") {
                return <td key={key + i}>{value}</td>;
              }
            })}
            {ControllerComponent ? <td>{ControllerComponent}</td> : null}
            
            {editHandler || deleteHandler || showHandler ? (
              <td>
                <div className="flex gap-4">
                  {showHandler ? (
                    <button><BsEye size={24} onClick={()=>{showHandler(responseData != null ? responseData.data[i] : item)}}/> </button>
                  ):null}
                  {editHandler ? (
                    <MainButton
                      ClickHandler={() => {                        
                        editHandler(responseData != null ? responseData.data[i] : item);
                      }}
                      text={"تعديل "}
                    />
                  ) : null}
                  {deleteHandler ? (
                    <MainButton
                      ClickHandler={() => {
                        deleteHandler(item.id);
                      }}
                      text={"حذف"}
                      danger={true}
                    />
                  ) : null}
                </div>
              </td>
            ) : null}
          </tr>
        ))
      : (<div className="w-full flex justify-center p-9 "><p>لا يوجد بيانات</p></div>);
  };
  const buildHeader = (
    <tr>
      {CustomHeader
        ? CustomHeader.map((item, i) => {
            return <td key={i}>{item}</td>;
          })
        : Object.keys(data[0]).map((item, i) => {
            return <td key={i}>{item}</td>;
          })}
      {editHandler || deleteHandler ? <td> تحكم </td> : null}
      {ControllerComponent ? <td> {""} </td> : null}
    </tr>
  );

  return (
    <Fragment>
      <div className="ps-4 pe-4 max-w-[350px] md:max-w-[1440px] " >
        <SectionTitle
          title={title}
          to={to}
          addBTNTitle={addBTNTitle}
          addBTNClickHandler={addBTNClickHandler}
        />
      </div>

      <div className="table-wrap max-w-[350px] md:max-w-[1440px] ">
        {isLoading ? (
          <div>
            <table>
              <thead>{buildHeader}</thead>
            </table>
            <ShimmerTable
              mode="light"
              row={7}
              col={CustomHeader.length + 1}
              border={1}
              borderColor={"#cbd5e1"}
              rounded={0.25}
              rowGap={16}
              colPadding={[20, 5, 20, 5]}
            />
          </div>
        ) : (
          <table>
            <thead>{buildHeader}</thead>
            <tbody>{buildItem(data)}</tbody>
          </table>
        )}

        <div className="h-16 p-4">
          <Pagination
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomTable;
