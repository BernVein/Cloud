  import { useEffect, useState } from "react"
  import { useParams, useNavigate } from 'react-router-dom'
  import supabase from "../config/supabaseClient"

  const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!title || !method || !rating) {
        setFormError("Please fill in all the fields correctly.");
        return;
      }
    
      const { data, error } = await supabase
        .from("smoothies")
        .update({ title, method, rating })
        .eq("id", id);
    
      if (error) {
        setFormError("Please fill in all the fields correctly.");
      }
      if (data) {
        setFormError(null);
  
      }
      navigate("/");
    };
    

    useEffect(() => {
      const fetchSmoothie = async () => {
        const { data, error } = await supabase
          .from('smoothies')
          .select()
          .eq('id', id)
          .single()

        if (error) {
          navigate('/', { replace: true })
          return
        }

        if (data) {
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
        }
      }

      fetchSmoothie()
    }, [id, navigate])

    return (
      <div className="page create">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">題名 (Title)</label>
          <input 
            type="text" 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="method">映画の説明 (Movie Description)</label>
          <textarea 
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <label htmlFor="rating">評価 (Rating)</label>
          <input 
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button>映画を更新 (Update Movie)</button>

          {formError && <p className="error">{formError}</p>} 
        </form>
      </div>
    )
  }

  export default Update
