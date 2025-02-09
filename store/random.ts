const unsplashApiKey = "J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA"; // Replace with your Unsplash API Key
const SURAH_URL = "https://api.alquran.cloud/v1/surah/"; // Correct Quran API URL
const TOTAL_SURAHS = 114; // Total number of surahs in the Quran

let totalAyahs;
let surahNumber;
let ayahNumber;
let ayah;
let translatedAyah;

// Function to fetch random Ayah and image
async function generateRandomContent() {
  try {
    console.log("Fetching random Ayah...");
    surahNumber = Math.floor(Math.random() * TOTAL_SURAHS) + 1; // Random Surah number
    const surahResponse = await fetch(SURAH_URL + surahNumber);

    if (!surahResponse.ok) {
      throw new Error(`Quran API Error: ${surahResponse.statusText}`);
    }
    const surahData = await surahResponse.json();
    totalAyahs = surahData.data.ayahs.length;
    ayahNumber = Math.floor(Math.random() * totalAyahs);
    ayah = surahData.data.ayahs[ayahNumber].text;

    await translateAyah();

    console.log("Fetching random Unsplash image...");
    const imageResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=nature&client_id=${unsplashApiKey}`
    );

    if (!imageResponse.ok) {
      throw new Error(`Unsplash API Error: ${imageResponse.statusText}`);
    }
    const imageData = await imageResponse.json();

    const imageUrl = imageData.urls.regular;
    const imageElement = document.getElementById("nature-image");
    if (imageElement) {
      imageElement.src = imageUrl;
    }

    console.log("Random content successfully fetched and updated.");
  } catch (error) {
    console.error("Error fetching random content:", error.message);
    alert(`Error: ${error.message}. Please try again.`);
  }
}

// Translate the randomly selected Ayah
async function translateAyah() {
  try {
    const translationResponse = await fetch(
      `${SURAH_URL}${surahNumber}/en.sahih`
    );

    if (!translationResponse.ok) {
      throw new Error(
        `Quran Translation API Error: ${translationResponse.statusText}`
      );
    }
    const translationData = await translationResponse.json();
    translatedAyah = translationData.data.ayahs[ayahNumber]?.text || "Translation not available";

    printToHTML();
  } catch (error) {
    console.error("Error translating Ayah:", error.message);
    throw error;
  }
}