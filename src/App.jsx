import './App.css';
import Header from './components/Header';
import TaskManager from './components/TaskManager/TaskManager';
import QuoteGenerator from './components/QuoteGenerator';
import WeatherView from './components/WeatherView' 

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main content container */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Task Manager (2/3 width) */}
          <div className="w-full lg:w-2/3">
            <TaskManager />
          </div>
          
          {/* Sidebar (1/3 width) */}
          <div className="w-full lg:w-1/3 space-y-6">
          <WeatherView/>
            <QuoteGenerator /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;