import { Dispatch, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

export default function Form({dispatch, state} : FormProps) {

    const initialState : Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )
            setActivity(selectedActivity[0])
        }
    }, [state.activeId])

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        
        setActivity({
            ...activity, 
            [e.target.id]: isNumberField ? +e.target.value : e.target.value})
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!isValidActivity()) return

        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }


  return (
    <form 
      onSubmit={(e) => handleSubmit(e)} 
      className="space-y-5 bg-white shadow-md p-10 pt-6 rounded-lg">

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 rounded-lg p-2 w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
            {categories.map(category => (
              <option 
                key={category.id}
                value={category.id}
                >
                {category.name}
            </option>
            ))}
        </select>
        
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name">Actividad:</label>
        <input 
            type="text" 
            name="name" 
            id="name" 
            className="border border-slate-300 rounded-lg p-2"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta..."
            value={activity.name}
            onChange={handleChange}
        />
        
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories">Calorías:</label>
        <input 
            type="number" 
            name="calories" 
            id="calories"
            min={0} 
            className="border border-slate-300 rounded-lg p-2"
            placeholder="Calorías. Ej. 300, 500, 1000..."
            value={activity.calories}
            onChange={handleChange}
        />
        
      </div>

      <input 
        type="submit" 
        value={`Guardar ${categories[activity.category - 1].name}`}
        className="bg-gray-800 hover:bg-gray-900 w-full text-white p-2 font-bold uppercase rounded-lg cursor-pointer disabled:opacity-10"
        disabled={!isValidActivity()}
      
      />
        

    </form>
  )
}
