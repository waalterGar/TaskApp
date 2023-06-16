import { Route, Routes } from "react-router-dom";
import { AthleteContextProvider } from "./context/AthleteProvider";
import { SessionContextProvider } from "./context/SessionProvider";
import { ExecutionContextProvider } from "./context/ExecutionProvider";
import { ExerciseProgressionContextProvider } from "./context/ExerciseProgressionProvider";
import {ExerciseContextProvider} from "./context/ExerciseProvider";
import {MealRecordContextProvider} from "./context/MealRecordProvider";
import { MealContextProvider } from "./context/MealProvider";
import Navbar from "./components/Navbar";
import AthletesPage from "./pages/AthletesPage";
import SessionsPage from "./pages/SessionsPage";
import ExecutionPage from "./pages/ExecutionPage";
import ExerciseProgressionPage from "./pages/ExerciseProgressionPage";
import ExercisePage from "./pages/ExerciseListPage";
import MealPlanPage from "./pages/MealPlanPage";
import MealListPage from "./pages/MealListPage";
import MealDetailPage from "./pages/MealDetailPage";
import SessionForm from "./pages/SessionForm";
import ExerciseForm from "./pages/ExerciseForm";
import ExecutionForm from "./pages/ExecutionForm";
import AthleteForm from "./pages/AthleteForm";
import MealForm from "./pages/MealForm";
import MealRecordForm from "./pages/MealRecordForm";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProflePage";

function App() {
  return (
      <div className="bg-zinc-900 h-screen">
        <Navbar /> 
        <div className="container mx-auto py-4 px-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      <AthleteContextProvider>
        <Routes>
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/athletes/new" element={<AthleteForm />} />
          </Routes>
      </AthleteContextProvider>
      <AthleteContextProvider>
      <SessionContextProvider>
        <Routes>
          <Route path="/routines/:idRoutine/athlete/:id/sessions/" element={<SessionsPage />} />
          <Route path="/routines/:idRoutine/athlete/:id/sessions/:idSession/edit/" element={<SessionForm />} />
          <Route path="/routines/:idRoutine/athlete/:id/sessions/new/" element={<SessionForm />} />
          </Routes>
      </SessionContextProvider>
      </AthleteContextProvider>
      <ExerciseContextProvider>
      <AthleteContextProvider>
      <ExecutionContextProvider>
      <SessionContextProvider>
        <Routes>
          <Route path="/sessions/:id/executions/" element={<ExecutionPage />} />
          <Route path="/executions/:idExecution/edit/" element={<ExecutionForm />} />
          <Route path="/sessions/:idSession/executions/new" element={<ExecutionForm />} />
          </Routes>
        </SessionContextProvider>
      </ExecutionContextProvider>
      </AthleteContextProvider>
      </ExerciseContextProvider>
      <ExerciseProgressionContextProvider>
        <Routes>
          <Route path="/athlete/:idAthlete/progression/:id" element={<ExerciseProgressionPage />} />
          </Routes>
      </ExerciseProgressionContextProvider>
      <ExerciseContextProvider>
        <Routes>
          <Route path="/trainers/:id/exercises" element={<ExercisePage />} />
          <Route path="/exercises/:id/edit" element={<ExerciseForm />} />
          <Route path="/trainer/:idTrainer/exercises/new" element={<ExerciseForm />} />
          </Routes>
      </ExerciseContextProvider>
      <AthleteContextProvider>
      <MealContextProvider>
      <MealRecordContextProvider>
        <Routes>
          <Route path="/mealPlan/:id" element={<MealPlanPage />} />
          <Route path="/dietitians/:idDietitian/mealPlan/:idMealPlan/athletes/:id/mealRecords" element={<MealPlanPage />} />
          <Route path="/mealRecords/:idMealRecord/edit/" element={<MealRecordForm />} />
          <Route path="/mealPlan/:idMealPlan/mealRecords/new" element={<MealRecordForm />} />
          </Routes>
      </MealRecordContextProvider>
      </MealContextProvider>
      </AthleteContextProvider>
      <MealContextProvider>
        <Routes>
          <Route path="/meals" element={<MealListPage />} />
          <Route path="/meals/new" element={<MealForm />} />
          <Route path="/meals/:id/edit" element={<MealForm />} />
          <Route path="/dietitians/:id/meals/:idMeal" element={<MealDetailPage />} />
          </Routes>
      </MealContextProvider>
        </div>
        <footer className=" fixed bottom-0 bg-black-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center space-x-10">
        <p>&copy; 2023 All rights reserved</p>
        <nav>
          <ul className="flex space-x-10">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
      </div>
  );
}

export default App;
