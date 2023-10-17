import { _eventData_ } from "@/utils/constant";
import { getEventItem } from "@/utils/function";
import { EventData, useGetDataProps } from "@/utils/interface";
import { useState, useEffect } from "react";

export const useGetData = (): useGetDataProps => {
  const [data, setData] = useState<EventData>(_eventData_);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(getEventItem);
    setIsLoading(false);
  }, []);

  return { data, setData, isLoading };
};
