import type { Route } from "./+types/home";
import NavBar from "~/Components/navbar";
import { resumes } from '../Constants/index'
import ResumeCard from "~/Components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback for your dream job!" },
  ];
}

export default function Home() {

  const { auth } = usePuterStore()
  const navigate = useNavigate()

  useEffect( () => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/')
        }
    }, [auth.isAuthenticated])
    
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <NavBar></NavBar>
    <section className="main-section">
      <div className="page-heading py-10">
        <h1>Track Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI -powered feedback.</h2>
      </div>

      {resumes.length > 0 && (
      <div className="resumes-section">
          {resumes.map((resume) => (
          <ResumeCard key = {resume.id} resume={resume}></ResumeCard>
          ))}
      </div>
    )}
    </section>
    
  </main>
}
