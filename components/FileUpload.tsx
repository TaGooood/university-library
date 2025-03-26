"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    console.log(config.env.apiEndpoint);
    const response = await fetch(`${config.env.apiEndpoint}/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status:${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, token, expire } = data;
    return {
      signature,
      token,
      expire,
    };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const ikUplaodRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string; thumbnailUrl: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);
    toast.error("Image uplaoded failed", {
      description: `Your image could not be uploaded. Please try again.`,
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image uplaoded successfully", {
      description: `${res.filePath} uploaded successfully!`,
    });
  };
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        ref={ikUplaodRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="text-upload.png"
        className="hidden"
      />
      <Button
        className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md"
        onClick={(e) => {
          e.preventDefault();
          if (ikUplaodRef.current) {
            // @ts-ignore
            ikUplaodRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="Uploaded icon"
          className="object-contain"
        />
        <p className="text-light-100 text-base">Upload a File</p>
      </Button>
      {file && <p className="mt-1 text-center text-xs">{file.filePath}</p>}
      {file && <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />}
    </ImageKitProvider>
  );
};

export default FileUpload;
