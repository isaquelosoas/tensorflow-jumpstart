"use client";
import styles from "./page.module.css";
import Predition from "../../public/response.json";
import Labels from "../../public/labels.json";

export default function Home() {
  const data = Predition.probabilities
    .map((probability, index) => ({
      label: Labels[index],
      probability: probability,
    }))
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    .slice(0, 5);
  console.log(Labels.length, Predition.probabilities.length);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form>
          <input type="file" accept="image/*" capture="environment" />
        </form>
        <ol>
          <li>{JSON.stringify(data)}</li>
        </ol>
      </main>
    </div>
  );
}
