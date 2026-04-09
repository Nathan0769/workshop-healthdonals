"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Props = {
  image: File | string | undefined;
  onChange: (file: File) => void;
};

export function FirebaseImageUpload({ image, onChange }: Props) {
  const [preview, setPreview] = useState<string | undefined>(
    typeof image === "string" ? image : undefined
  );

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className="flex items-center gap-3">
      <Input type="file" accept="image/*" onChange={onImageUpload} />
      {preview && (
        <Image
          src={preview}
          alt="preview"
          width={56}
          height={56}
          className="size-14 rounded-lg object-cover"
          unoptimized
        />
      )}
    </div>
  );
}
