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
    <>
      <h1>csrf token working</h1>
    </>
  );
}
export default App;