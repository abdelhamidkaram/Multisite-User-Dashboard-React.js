import { Fragment } from "react";
import SectionTitle from "../UIElements/SectionTitle";
import MainButton from "../UIElements/MainButton";
import { ShimmerTable } from "shimmer-effects-react";

const CustomTable = ({
  data,
  responseData,
  CustomHeader,
  ControllerComponent,
  title,
  editHandler,
  deleteHandler,
  to,
  addBTNTitle,
  addBTNClickHandler,
  isLoading,
}) => {
  const buildItem = (data) => {
    return data.map != null
      ? data.map((item, i) => (
          <tr key={i}>
            {Object.keys(item).map((key) => {
              const value = item[key];
              if (typeof value != "object") {
                return <td key={key + i}>{value}</td>;
              }
            })}
            {editHandler || deleteHandler ? (
              <td>
                <div className="flex gap-4">
                  {editHandler ? (
                    <MainButton
                      ClickHandler={() => {
                        editHandler(responseData ? responseData[i] : item);
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
            {ControllerComponent ? <td>{ControllerComponent}</td> : null}
          </tr>
        ))
      : null;
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
      <div className="ps-4 pe-4" style={{ maxWidth: "1440px" }}>
        <SectionTitle
          title={title}
          to={to}
          addBTNTitle={addBTNTitle}
          addBTNClickHandler={addBTNClickHandler}
        />
      </div>

      <div className="table-wrap ">
        {isLoading ? (
          <div>
            <table>
              <thead>{buildHeader}</thead>
            </table>
            <ShimmerTable
              mode="light"
              row={3}
              col={CustomHeader.length +1}
              border={1}
              borderColor={"#cbd5e1"}
              rounded={0.25}
              rowGap={16}
              colPadding={[10, 5, 10, 5]}
            />
          </div>
        ) : (
          <table>
            <thead>{buildHeader}</thead>
            <tbody>{buildItem(data)}</tbody>
          </table>
        )}

        <div className="h-14"></div>
      </div>
    </Fragment>
  );
};

export default CustomTable;
