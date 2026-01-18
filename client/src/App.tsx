import { useEffect } from "react";
import axios from 'axios';
function App() {
  useEffect(() => {
    const fetchCsrf = async () => {
      await axios.get('http://localhost:1300/api/csrf-token', {
        withCredentials: true
      });
    };
    fetchCsrf();
  }, []);
  return (
    <div className="w-screen h-screen flex items-center justify-center text-5xl font-bold text-center">
      <h1>Website full protection</h1>
    </div>
  );
}
export default App;