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

  async function loadMealRecords(id) {
    const response = await getAthleteMealRecordsRequest(id);
    setMealRecords(response.data);
  }

  async function getRecord(id) {
    try {
      console.log("getRecord",id);
      const response = await getRecordRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  const updateRecord = async (id, record) => {
    try {
      const response = await updateRecordRequest(id, record);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  const createRecord= async (record) => {
    try {
      console.log("parsed", record);
      const response = await createRecordRequest(record);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await deleteRecordRequest(id);
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