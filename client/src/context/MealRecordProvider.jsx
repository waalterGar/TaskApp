import { useContext, useState } from "react";
import {
   getAthleteMealRecordsRequest,
} from "../api/trainer.api";
import {getRecordRequest, updateRecordRequest, createRecordRequest, deleteRecordRequest}from "../api/dietitian.api";
import { MealRecordContext } from "./MealPlanContext";

export const useMealRecords = () => {
  const context = useContext(MealRecordContext);
  if (!context)
    throw new Error("useMealPlan must be used within a SessionContextProvider");

  return context;
};

export const MealRecordContextProvider = ({ children }) => {
  const [mealRecords, setMealRecords] = useState([]);

  async function loadMealRecords(id, token) {
    console.log("loadMealRecords",id);
    const response = await getAthleteMealRecordsRequest(id, token);
    setMealRecords(response.data);
  }

  async function getRecord(id, token) {
    try {
      console.log("getRecord",id);
      const response = await getRecordRequest(id, token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  const updateRecord = async (id, record, token) => {
    try {
      const response = await updateRecordRequest(id, record, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  const createRecord= async (record, token) => {
    try {
      console.log("parsed", record);
      const response = await createRecordRequest(record, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id, token) => {
    try {
      const response = await deleteRecordRequest(id, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

    return (
    <MealRecordContext.Provider
      value={{
        mealRecords,
        loadMealRecords,
        getRecord,
        updateRecord,
        createRecord,
        deleteRecord
      }}
    >
      {children}
    </MealRecordContext.Provider>
  );
};