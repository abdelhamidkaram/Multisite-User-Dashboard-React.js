import { useRef, useState } from "react";
import icon from "../../assets/icons/apps.svg";
import SectionTitle from "../UIElements/SectionTitle";


const AnalyticsCard = ({itemsList ,  showTitle}) => {
    const [people, setPeople] = useState(itemsList);
      const dragPerson = useRef(0);
      const draggedOverPerson = useRef(0);
    
      function handleSort() {
        const peopleClone = [...people];
        const temp = peopleClone[dragPerson.current];
        peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
        peopleClone[draggedOverPerson.current] = temp;
        setPeople(peopleClone);
      }
    
  return (
    <div className="py-10 ">
    {showTitle ? <SectionTitle title={'الاحصائيات '} to={'/analytics'} /> : null }
      <div className="grid lg:grid-flow-row gap-5 p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {people.map((item, index) => (
          <div
            key={index}
            className=" shadow-sm  hover:drop-shadow-md h-28 space-x-3 border rounded-md p-2 bg-white cursor-move"
            draggable
            onDragStart={() => (dragPerson.current = index)}
            onDragEnter={() => (draggedOverPerson.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="text-lg font-semibold mb-2 text-blue-dark">{item.name}</h2>
            <div className="flex justify-between">
              <p className="font-bold text-xl  "> {item.num} </p>
              <img
                src={icon}
                className="w-10 p-2 bg-blue-light rounded-full  "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;
