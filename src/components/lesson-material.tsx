import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import {
  EventData,
  LessonMaterial,
  LessonMaterialProps,
} from "../utils/interface";
import Image from "next/image";
import { secondsToMinutes, setEventItem } from "@/utils/function";
import { _eventData_ } from "../utils/constant";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import DeleteButton from "@/components/delete-button";

const LessonMaterialItem: FC<LessonMaterial & { onDelete: () => void }> = ({
  lesson_name,
  lesson_schedule,
  lesson_duration,
  is_required,
  is_previewable,
  lesson_type,
  is_downloadable,
  onDelete,
}) => {
  return (
    <div className="flex py-2 px-1">
      <div className="flex justify-between hover:bg-[#FBFAFF] w-full items-center">
        <div className="flex">
          <Image
            src="/handle-icon.svg"
            alt="handle-icon"
            className="mr-2"
            width={22.97}
            height={24}
            priority
          />
          <div className="flex items-center">
            <Image
              src={`/${lesson_type}-icon.svg`}
              alt={lesson_type}
              className="mr-2"
              width={48}
              height={48}
              priority
            />
            <p className="text-[16px] font-[500] leading-[24px] text-[#252A3C]">
              {lesson_name}
              {is_required && (
                <>
                  <span className="text-[#DFE5EE]/80">|</span>
                  <span className="text-[#7800EF]"> Required</span>
                </>
              )}
              {is_previewable && (
                <>
                  <span className="text-[#8189A2]/80">
                    <Image
                      src="/previewable.svg"
                      alt="previewable-icon"
                      className="inline-block"
                      width={24}
                      height={24}
                      priority
                    />
                    Previewable
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <p className="text-[16px] font-[500] leading-[24px] text-[#252A3C]">
            <Image
              src="/time.svg"
              alt="time-icon"
              className="inline-block mr-2"
              width={24}
              height={24}
              priority
            />
            {dayjs(lesson_schedule).format("DD MMMM YYYY, HH:mm")}
            <span className="text-[#8189A2]/80">
              <Image
                src="/previewable.svg"
                alt="previewable-icon"
                className="inline-block"
                width={24}
                height={24}
                priority
              />
            </span>
            <Image
              src="/time.svg"
              alt="time-icon"
              className="inline-block mr-2"
              width={24}
              height={24}
              priority
            />
            {secondsToMinutes(lesson_duration)}
            {is_downloadable && (
              <>
                <span className="text-[#8189A2]/80">
                  <Image
                    src="/previewable.svg"
                    alt="previewable-icon"
                    className="inline-block"
                    width={24}
                    height={24}
                    priority
                  />
                </span>
                <Image
                  src="/download.svg"
                  alt="download-icon"
                  className="inline-block mr-2"
                  width={24}
                  height={24}
                  priority
                />
                Downloadable
              </>
            )}
          </p>
          <DeleteButton onDelete={onDelete} icon="vertical" />
          {/* <button className="bg-[#F6F8FC] py-2 px-4 rounded-md ml-3">
            <Image
              src="/vertical-dot.svg"
              alt="options-icon"
              width={5}
              height={5}
              priority
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};

const LessonMaterial: FC<
  LessonMaterialProps & {
    state: [EventData, Dispatch<SetStateAction<EventData | undefined>>];
  }
> = ({
  curriculum_id,
  lesson_material,
  isDisabeld,
  state,
  curriculumIndex,
}) => {
  const [data, setData] = state;
  const getListStyle = (isDraggingOver: boolean) =>
    isDraggingOver ? "bg-gray-50 rounded-md" : "rounded-md";
  const getItemStyle = (isDragging: boolean) =>
    isDragging ? "border rounded-md bg-[#FBFAFF] border-[#7800EF]" : "";

  const deleteData = (deleteIndex: number) => {
    const shallowCopy = { ...data };
    shallowCopy.curriculum[curriculumIndex].lesson_material.splice(
      deleteIndex,
      1
    );
    setData(shallowCopy);
    setEventItem(shallowCopy);
  };

  return (
    <div className="py-2 px-7">
      <Droppable droppableId={curriculum_id} isDropDisabled={isDisabeld}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={getListStyle(snapshot.isDraggingOver)}
          >
            {lesson_material.map((lesson, idx) => (
              <Draggable
                key={lesson.lesson_id + curriculum_id}
                draggableId={lesson.lesson_id + curriculum_id}
                index={idx}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={getItemStyle(snapshot.isDragging)}
                    style={provided.draggableProps.style}
                  >
                    <LessonMaterialItem
                      {...lesson}
                      onDelete={() => deleteData(idx)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default LessonMaterial;
