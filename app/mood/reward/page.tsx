"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

interface AyahData {
  ayah: string;
  translation: string;
  surah: string;
  ayahNumber: number;
  image: string;
}

const RandomAyahPage: React.FC = () => {
  const [ayahData, setAyahData] = useState<AyahData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomAyah = async () => {
    setLoading(true);
    try {
      const response = await fetch("/random-ayah");
      // if (!response.ok) throw new Error("Failed to fetch Ayah");
      const data: AyahData = await response.json();
      setAyahData(data);
    } catch (error) {
      console.error("Error fetching random Ayah:", error);
      alert("Failed to fetch Ayah. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className={styles.title}>Generate Random Quran Ayah</h1>

      <div className={styles.imageSection}>
        <Image
          src={ayahData?.image || "/images/jump.gif"}
          height={500}
          width={500}
          alt="Nature"
          className={styles.image}
        />
      </div>

      <div className={styles.ayahSection}>
        {loading ? (
          <p>Loading...</p>
        ) : ayahData ? (
          <>
            <p className={styles.arabic}>{ayahData.ayah}</p>
            <p className={styles.translation}>
              <strong>Surah {ayahData.surah}, Ayah {ayahData.ayahNumber}</strong>
              <br />
              {ayahData.translation}
            </p>
          </>
        ) : (
          <p>Click the button to generate a random Ayah...</p>
        )}
      </div>

      <button onClick={fetchRandomAyah} className={styles.button}>
        Generate Random Ayah
      </button>
    </div>
  );
};

export default RandomAyahPage; // This must be the default export