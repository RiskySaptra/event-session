import { CurriculumProps } from "@/utils/interface";
import {
  DragStart,
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { FC, useState } from "react";
import Image from "next/image";
import { reorder, setEventItem } from "@/utils/function";
import AddLesson from "@/components/curiculum/add-lesson-dropdown.tsx/add-lesson";
import EditableField from "@/components/editable-text";

const Curriculum: FC<CurriculumProps> = ({ state, children }) => {
  const [data, setData] = state;
  const [activeDropable, setActiveDropable] = useState("");

  const onDragStart = (task: DragStart) => {
    setActiveDropable(task.source.droppableId);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const shallowCopy = { ...data };

    if (result.type === "group") {
      const updateCuriculum = reorder(
        data.curriculum,
        result.source.index,
        result.destination.index
      );

      shallowCopy.curriculum = updateCuriculum;
      setEventItem(shallowCopy);
      setData(shallowCopy);
      return;
    }

    const storeSourceIndex = shallowCopy.curriculum.findIndex(
      (curriculum) => curriculum.curriculum_id === result.source.droppableId
    );

    const updatedLessons = reorder(
      data.curriculum[storeSourceIndex].lesson_material,
      result.source.index,
      result.destination.index
    );

    shallowCopy.curriculum[storeSourceIndex].lesson_material = updatedLessons;
    setEventItem(shallowCopy);
    setData(shallowCopy);
    return;
  };

  const getListStyle = (isDraggingOver: boolean) =>
    isDraggingOver ? "bg-gray-50 rounded-[8px]" : "rounded-[8px]";
  const getItemStyle = (isDragging: boolean) =>
    isDragging
      ? "bg-white mt-8 border-2 border-[#7800EF] rounded-[8px]"
      : "bg-white mt-8 border-2 rounded-[8px]";

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="curiculum" type="group">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={getListStyle(snapshot.isDraggingOver)}
          >
            {data.curriculum.map((session, index) => (
              <Draggable
                key={session.curriculum_id}
                draggableId={session.curriculum_id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={getItemStyle(snapshot.isDragging)}
                    style={provided.draggableProps.style}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center px-4 pt-4">
                        <Image
                          src="/handle-icon.svg"
                          alt="handle-icon"
                          className="mr-2"
                          width={22.97}
                          height={24}
                          priority
                        />
                        <EditableField state={[data, setData]} index={index} />
                      </div>

                      <div className="flex px-8 pt-4 pb-2">
                        <button className="bg-[#F6F8FC] py-4 px-[9px] rounded-md ml-3">
                          <Image
                            src="/horizontal-dot.svg"
                            alt="options-icon"
                            width={18}
                            height={18}
                            priority
                          />
                        </button>
                      </div>
                    </div>

                    {children({
                      ...session,
                      isDisabeld: session.curriculum_id !== activeDropable,
                    })}

                    <AddLesson state={[data, setData]} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Curriculum;
