import { useNavigate } from "react-router-dom";

function TitleHeader({ title, btntext, btnlink, role, btndisabled}) {
  console.log(role);
  return (
       <div>
            <div className="">
        <h1 className="text-5xl text-white font-bold text-left inline">{title}</h1>
        {
            renderButton(btntext, btnlink, role, btndisabled)
        }
        </div>
      {renderBar(role)}
       </div>
  );
}

function renderButton(btntext, btnlink, role, btndisabled) {
  const navigate = useNavigate();
  if(btndisabled) return;
  if (btntext && btnlink && role) {
    if(role === "trainer")return (<div className="bg-red-800 text-white font-bold inline p-2 rounded-md float-right cursor-pointer" onClick={() => navigate(btnlink)}>{btntext}</div>);
    if(role === "dietitian")return (<div className="bg-green-800 text-white font-bold inline p-2 rounded-md float-right cursor-pointer" onClick={() => navigate(btnlink)}>{btntext}</div>);
    return (<div className="bg-purple-800 text-white font-bold inline p-2 rounded-md float-right cursor-pointer" onClick={() => navigate(btnlink)}>{btntext}</div>)  
  }
}

function renderBar(role){
  if(role === "trainer")return (<div className="h-3 bg-red-800 w-full mb-10 mt-2 rounded-md shadow-xl"></div>);
  if(role === "dietitian")return (<div className="h-3 bg-green-800 w-full mb-10 mt-2 rounded-md shadow-xl"></div>);
  return (<div className="h-3 bg-purple-800 w-full mb-10 mt-2 rounded-md shadow-xl"></div>);
}

export default TitleHeader;