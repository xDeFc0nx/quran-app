import { TextEffect } from "../ui/text-effect";
import { TextGenerateEffect } from "../ui/text-generate-effect";

type TextProp = {
  text: string;
}

export function TextGenerator({text}: TextProp) {
  return <TextGenerateEffect words={text} />;
}

export function TextEffectPerChar() {
  return (
    <TextEffect per='char' preset='fade' className="text-lg max-w-2xl ">
      Generate Quranic ayahs tailored to your mood, discover
      random verses for fresh wisdom, or find the Qibla in an instant.
    </TextEffect>
  );
}