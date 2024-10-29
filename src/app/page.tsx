"use client";
import styles from "./page.module.css";
import Prediction from "../../public/response.json";
import Labels from "../../public/labels.json";
import { useState, useCallback } from "react";
import { ImagePreview } from "@/components/ImagePreview";
import { ImageUpload } from "@/components/ImageUpload";
import { PredictionList } from "@/components/PredictionList";

const MAX_PREDICTIONS = 5;

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const predictions = Prediction.probabilities
    .map((probability, index) => ({
      label: Labels[index],
      probability,
    }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, MAX_PREDICTIONS);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {imageSrc && <ImagePreview src={imageSrc} />}
        <ImageUpload onImageChange={handleImageChange} />
        <PredictionList predictions={predictions} />
      </main>
    </div>
  );
}
