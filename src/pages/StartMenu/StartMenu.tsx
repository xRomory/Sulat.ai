import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";

const StartMenu = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className="mx-auto container flex justify-center mb-2">
        <h1 className="logo">Sulat.ai</h1>
      </div>

      <Button variant="default" className="md:text-lg rounded-lg" onClick={() => navigate("/home")}>Start Now</Button>
    </div>
  )
}

export default StartMenu