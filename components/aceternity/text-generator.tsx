import { TextEffect } from "../ui/text-effect";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `At Sevteen, we fuse modern technology with timeless Islamic values, helping the Ummah stay seamlessly connected to their Deen wherever they are`;

export function TextGenerator() {
  return <TextGenerateEffect words={words} />;
}

export function TextEffectPerChar() {
  return (
    <TextEffect per='char' preset='fade' className="text-lg max-w-2xl ">
      Generate Quranic ayahs tailored to your mood, discover
      random verses for fresh wisdom, or find the Qibla in an instant.
    </TextEffect>
  );
}