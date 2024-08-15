const TabsHeader = ({ tabs, handelClick, tabNumber }) => {
  return (
    <div className="flex md:justify-center flex-wrap gap-3 ">
      {tabs.map((item, i) => {
        return (
          <TabHeader
            key={i}
            icon={item.icon}
            name={item.name}
            num={i + 1}
            handelClick={handelClick}
            tabNumber={tabNumber}
          />
        );
      })}
    </div>
  );
};

export default TabsHeader;

const TabHeader = ({ icon, name, num, handelClick, tabNumber }) => {
  return (
    <div
      className={`${
        tabNumber == num ? " border border-blue-light shadow-md" : ""
      } flex gap-3 cursor-pointer bg-white  me-5 p-6  rounded-lg  hover:shadow-md `}
      onClick={() => handelClick(num)}
    >
      {icon}
      <h3> {name}</h3>
    </div>
  );
};
