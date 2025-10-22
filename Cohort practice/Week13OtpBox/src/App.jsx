import { useEffect, useState } from "react";
import "./App.css";
import { SidebarToggle } from "./components/icons/SidebarToggle";
import ProfileCard from "./components/Profile/Profile";
import { Calendar, Plus, Film } from "lucide-react";



const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  
  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isDesktop]);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen} />
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div>
      
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-md transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-blue-600">Webinar.gg</span>
          <div
            className="cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <SidebarToggle />
          </div>
        </div>

        <ul className="p-4 space-y-3">
          <li className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 cursor-pointer">
            <span>🏠</span> Home
          </li>
          <li className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 cursor-pointer">
            <span>🎥</span> Webinars
          </li>
          <li className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 cursor-pointer">
            <span>💳</span> Billing
          </li>
          <li className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 cursor-pointer">
            <span>👥</span> User Management
          </li>
          <li className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 cursor-pointer">
            <span>⚙️</span> Settings
          </li>
        </ul>
      </div>

      
      {!sidebarOpen && (
        <div
          className="fixed top-4 left-4 cursor-pointer z-50 bg-white p-2 rounded shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <SidebarToggle />
        </div>
      )}
    </div>
  );
}

function WebinarSchedule() {
  const events = [
    { time: "11:30 AM", status: "Live", color: "red", title: "UX Webinar" },
    { time: "11:30 AM", status: "Upcoming", color: "blue", title: "My first Webinar" },
    { time: "11:30 AM", status: "Upcoming", color: "blue", title: "Important Webinar" },
    { time: "11:30 AM", status: "Upcoming", color: "blue", title: "Webinar 1" },
  ];

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-800 font-medium">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-semibold">Friday, 12 September 2025</span>
        </div>
        <div className="flex gap-2 text-gray-500">
          <button className="p-1 hover:text-gray-700">&larr;</button>
          <button className="p-1 hover:text-gray-700">&rarr;</button>
        </div>
      </div>

      
      {events.map((e, i) => (
        <div
          key={i}
          className="flex items-start justify-between border-t border-gray-200 pt-3 first:border-t-0 first:pt-0"
        >
          <div className="w-24 text-gray-600 text-sm">{e.time}</div>
          <div className="flex-1 pl-4 border-l-2"
               style={{ borderColor: e.color === "red" ? "#ef4444" : "#3b82f6" }}>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold ${
                  e.color === "red" ? "text-red-500" : "text-blue-500"
                }`}
              >
                {e.status}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  e.color === "red" ? "bg-red-500" : "bg-blue-500"
                }`}
              />
            </div>
            <div className="text-gray-800 font-medium">{e.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


function WebinarActions() {
  const actions = [
    { icon: Calendar, label: "Schedule a Webinar" },
    { icon: Plus, label: "Join a Webinar" },
    { icon: Film, label: "Open Recordings" },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {actions.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="flex flex-col items-center text-gray-800 hover:scale-105 transition"
        >
          <div className="bg-cyan-400 p-4 rounded-md mb-2">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-center">{label}</span>
        </button>
      ))}
    </div>
  );
}



function MainContent({ sidebarOpen }) {
  
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className={`transition-all duration-300 w-full 
        ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}
    >
      
      <div className="h-56 bg-black hidden md:block"></div>

      <div className="grid grid-cols-11 gap-8 p-8">
        
        <div className="md:col-span-2 row-span-2 h-full">
          <div className="h-64 rounded-2xl shadow-lg mb-8">
            <ProfileCard />
          </div>
        </div>

        
        <div className="md:col-span-9 space-y-2">
          <p className="text-blue-600 text-lg font-medium">{today}</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Good morning, Natasha Dias!
          </h1>
        </div>

        
        <div className="md:col-span-6 rounded-2xl bg-white border border-gray-300 shadow-md p-6">
            <WebinarSchedule />
        </div>
        

       <div className="md:col-span-3 rounded-2xl bg-white border border-gray-300 shadow-md p-6">
          <WebinarActions />
        </div>

      </div>
    </div>
  );
}


export default App;
