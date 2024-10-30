"use client";
import styles from "./page.module.css";
import Labels from "../../public/labels.json";
import { MouseEvent, useState } from "react";
import { ImagePreview } from "@/app/_components/ImagePreview";
import { ImageUpload } from "@/app/_components/ImageUpload";
import { PredictionList } from "@/app/_components/PredictionList";
import axios from "axios";

const MAX_PREDICTIONS = 5;

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<IPredictionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      // setSelectedImage(Buffer.from(e.target?.result as ArrayBuffer));
    };
    reader.readAsDataURL(file);
  };

  const sortPredictions = (probabilities: number[]) => {
    return probabilities
      .map((probability, index) => ({
        label: Labels[index],
        probability,
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, MAX_PREDICTIONS);
  };

  const handleSubmitImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    console.log(selectedImage);
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);
        console.log(formData);
        const predictionResponse = await axios.post(
          "/api/v1/prediction",
          formData,
          { headers: { "Content-Type": "application/x-image" } }
        );
        setPredictions(sortPredictions(predictionResponse.data.probabilities));
      } catch (error) {
        setError("Something went wrong with your request.");
        setPredictions([]);
      }
    } else {
      setError("Please select an image to submit.");
    }
  };
  console.log(selectedImage);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {imageSrc && <ImagePreview src={imageSrc} />}
        <ImageUpload
          onImageChange={handleImageChange}
          onSubmitImage={handleSubmitImage}
        />
        {error && <p>{error}</p>}
        <PredictionList predictions={predictions} />
      </main>
    </div>
  );
}
