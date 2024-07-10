
type CaloriesDisplayProps = {
    calories: number,
    text: string
}

export default function CaloriesDisplay({calories, text} : CaloriesDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center"><span className="text-6xl font-black text-white">{calories}</span>{text}</p>
  )
}
