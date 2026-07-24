"use client"

import { useEffect, useState } from "react";
import { translateText } from "@/lib/translator";
import { useApp } from "@/lib/store";

export function TranslatedText({ text }: { text: string }) {
  const { lang } = useApp();
  const [value, setValue] = useState(text);

  useEffect(() => {
    translateText(text, lang).then(setValue);
  }, [lang, text]);

  return <>{value}</>;
}