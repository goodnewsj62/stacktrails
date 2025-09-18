"use client";

import ListCourse from "../courses/ListCourses";
import { useFilter } from "./FilterProvider";

type ListCourseWrapperProps = {};

// just here cause i want ListCourse to be independent
const ListCourseWrapper: React.FC<ListCourseWrapperProps> = () => {
  const { value } = useFilter();
  return <ListCourse params={value} />;
};

export default ListCourseWrapper;
