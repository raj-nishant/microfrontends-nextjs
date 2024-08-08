import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import LoginForm from "./LoginForm";
import LoginCard from "./LoginCard";
import start from "../../../assets/kid.png"; // Ensure this path is correct
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser(storedUsername);
      router.push("/dashboard"); // Navigate to dashboard if user exists
    }
  }, [router]);

  if (user) return null; // Prevent rendering the component if user exists

  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <img src={start.src} className={styles.image} alt="Start" />
        <div className={styles.textContainer}>
          <h3 className={styles.title}>Health Tracking</h3>
          <p className={styles.subtitle}>Your Fitness Journey Starts Here</p>
        </div>
      </section>

      <LoginForm />

      <section className={styles.featuresSection}>
        <p className={styles.featuresTitle}>Features of our application</p>
        <div className={styles.featuresGrid}>
          {[
            {
              id: 1,
              name: "Create Your Own Challenge.",
              desc: "Start by creating a new challenge with a custom title and description. Set your start and end dates, and define the frequency to track your progress effectively.",
            },
            {
              id: 2,
              name: "Set Challenge Frequency",
              desc: "Customize your challenge by defining how often you want to complete it, whether daily or weekly. Stay on track with your personalized schedule.",
            },
            {
              id: 3,
              name: "Track Completion Status.",
              desc: "Mark each day or week as completed or missed to keep an accurate record of your challenge. Stay motivated by monitoring your consistency.",
            },
            {
              id: 4,
              name: "Monitor Your Progress.",
              desc: "Display the progress of your challenge from start to finish. Visualize your achievements and identify areas for improvement as you work towards your goals.",
            },
          ].map((challenge) => (
            <LoginCard data={challenge} key={challenge.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Login;
