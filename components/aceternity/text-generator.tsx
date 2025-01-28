import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `At Sevteen, we fuse modern technology with timeless Islamic values, helping the Ummah stay seamlessly connected to their Deen wherever they are`;

export function TextGenerator() {
  return <TextGenerateEffect words={words} />;
}
