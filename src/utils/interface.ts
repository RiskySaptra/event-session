import { Dispatch, ReactElement, SetStateAction } from "react";

export interface HomeProps {
  data: EventData;
}

export interface LessonMaterial {
  lesson_id: string;
  lesson_name: string;
  lesson_type: string;
  is_required: boolean;
  is_previewable: boolean;
  lesson_schedule: string;
  lesson_duration: number;
  is_downloadable: boolean;
}

export interface Curriculum {
  curriculum_id: string;
  curriculum_name: string;
  lesson_material: LessonMaterial[];
}

export interface EventData {
  event_name: string;
  last_edited: string;
  event_schedule: string;
  curriculum: Curriculum[];
}

export interface LessonMaterialItemProps {
  data: LessonMaterial;
}

export interface CurriculumProps {
  state: [EventData, Dispatch<SetStateAction<EventData | undefined>>];
  children: (props: LessonMaterialProps) => ReactElement<boolean>;
}

export interface LessonMaterialProps extends Curriculum {
  isDisabeld: boolean;
}
