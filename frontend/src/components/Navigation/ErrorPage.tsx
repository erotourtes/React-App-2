import { Link, useLocation, useNavigate } from "react-router-dom";
import { H3, H4 } from "@components/typography.tsx";
import { NotepadTextDashed } from "lucide-react";
import styles from "./path.module.css";
import { useEffect, useState } from "react";
import { toHome } from "@components/Navigation/constants.ts";

const ErrorPage = () => {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(15)
  let { state } = useLocation()
  state = state || {}
  state.message = state.message || "Page not found"

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    if (seconds === 0) {
      clearInterval(interval)
      navigate(toHome())
    }

    return () => clearInterval(interval)
  }, [seconds, navigate]);

  return (
    <div className="container flex flex-col justify-center items-center w-lvw h-lvh">
      <div className="mx-auto text-center flex flex-col items-center relative -top-5">
        <NotepadTextDashed className={`${styles.myPath} relative -top-2`} size={75}/>
        <H3>Woops!</H3>
        <H4>{state.message}</H4>
      </div>
      <div className={"w-full text-center"}>
        <Link className={`underline`} to={toHome()}>Redirecting in {seconds} seconds</Link>
      </div>
    </div>
  );
}

export default ErrorPage;