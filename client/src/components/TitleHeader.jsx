import { useAthletes } from "../context/AthleteProvider";
import { useNavigate } from "react-router-dom";

function TitleHeader({ title, btntext, btnlink }) {
  return (
       <div>
            <div className="">
        <h1 className="text-5xl text-white font-bold text-left inline">{title}</h1>
        <div className="bg-red-800 text-white font-bold inline p-2 rounded-md float-right ">{btntext}</div>
        </div>
      <div className="h-3 bg-red-800 w-full mb-10 mt-2 rounded-md shadow-xl"></div>
       </div>

  );
}

export default TitleHeader;