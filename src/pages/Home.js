import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Error deleting smoothie:", error);
      return;
    }

    setSmoothies(prevSmoothies => prevSmoothies.filter(sm => sm.id !== id));
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select();

      if (error) {
        setFetchError("Could not fetch the data");
        setSmoothies(null);
        console.log(error);
      } else {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p className="error">{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard 
                key={smoothie.id} 
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
