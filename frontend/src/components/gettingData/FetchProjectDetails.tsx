"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchCompleteProjectDetails,
  fetchProjectData,
} from "@/store/projectSlice/projectSlice";
import { showPopUp } from "@/store/popUpContentSlice/popUpContentSlice";

function FetchProjectDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: RootState) => state.project.error);

  React.useEffect(() => {
    dispatch(fetchProjectData());
    dispatch(fetchCompleteProjectDetails());
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      dispatch(
        showPopUp({
          title: "Error",
          message:
            "There was an error fetching your project details. Please try again later.",
          type: "ERROR",
          isActionable: false,
        })
      );
    }
  }, [error, dispatch]);

  return <></>;
}

export default FetchProjectDetails;
