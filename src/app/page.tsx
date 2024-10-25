"use client";
import styles from "./page.module.css";
import Predition from "../../public/response.json";
import Labels from "../../public/labels.json";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const data = Predition.probabilities
    .map((probability, index) => ({
      label: Labels[index],
      probability: probability,
    }))
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    .slice(0, 5);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {imageSrc && (
          <div>
            <Image
              src={imageSrc}
              alt="Picture of the author"
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <form>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
          />
        </form>
        <ol>
          <li>{JSON.stringify(data)}</li>
        </ol>
      </main>
    </div>
  );
}
