import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import { TaskContextProvider } from "./context/TaskProvider";
import { AthleteContextProvider } from "./context/AthleteProvider";
import { SessionContextProvider } from "./context/SessionProvider";
import { ExecutionContextProvider } from "./context/ExecutionProvider";
import { ExerciseProgressionContextProvider } from "./context/ExerciseProgressionProvider";
import {ExerciseContextProvider} from "./context/ExerciseProvider";
import {MealPlanContextProvider} from "./context/MealPlanProvider";
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

function App() {
  return (
      <div className="bg-zinc-900 h-screen">
        <Navbar />
        <div className="container mx-auto py-4 px-20">
        <TaskContextProvider> 
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
      <AthleteContextProvider>
        <Routes>
          <Route path="/trainers/:id/athletes" element={<AthletesPage />} />
          </Routes>
      </AthleteContextProvider>
      <AthleteContextProvider>
      <SessionContextProvider>
        <Routes>
          <Route path="/athlete/:id/sessions/" element={<SessionsPage />} />
          <Route path="/sessions/:id/edit/" element={<SessionForm />} />
          <Route path="/routines/:idRoutine/sessions/new/" element={<SessionForm />} />
          </Routes>
      </SessionContextProvider>
      </AthleteContextProvider>
      <AthleteContextProvider>
      <ExecutionContextProvider>
      <SessionContextProvider>
        <Routes>
          <Route path="/athlete/:idAthlete/sessions/:id/executions/" element={<ExecutionPage />} />
          </Routes>
        </SessionContextProvider>
      </ExecutionContextProvider>
      </AthleteContextProvider>
      <ExerciseProgressionContextProvider>
        <Routes>
          <Route path="/athlete/:idAthlete/progression/:id" element={<ExerciseProgressionPage />} />
          </Routes>
      </ExerciseProgressionContextProvider>
      <ExerciseContextProvider>
        <Routes>
          <Route path="/trainer/:id/exercises" element={<ExercisePage />} />
          </Routes>
      </ExerciseContextProvider>
      <AthleteContextProvider>
      <MealPlanContextProvider>
        <Routes>
          <Route path="/mealPlan/:id" element={<MealPlanPage />} />
          </Routes>
      </MealPlanContextProvider>
      </AthleteContextProvider>
      <MealContextProvider>
        <Routes>
          <Route path="/dietitians/:id/meals" element={<MealListPage />} />
          </Routes>
      </MealContextProvider>
      <MealContextProvider>
        <Routes>
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
