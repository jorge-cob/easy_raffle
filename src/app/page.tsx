'use client'

import ImagePreview from "@/components/ImagePreview";
import '@mantine/core/styles.css';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react";

export default function Home() {
  
    const [raffleNumber, setRaffleNumber] = useState<number>(0);
    const [paddedRaffleNumber, setPaddedRaffleNumber] = useState<string>("0000");
    const [previewImage, setPreviewImage] = useState<string>("");
  
    useEffect(() => {
    	setPaddedRaffleNumber(raffleNumber.toString().padStart(4, '0'))
	}, [raffleNumber])
    const selectImage = (event: { target: { files: FileList | null; }; }) => {
        const selectedFiles = event.target.files as FileList;
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
	};

    const handleChangeNumber = (event: { target: { value: any; }; }) => {
        setRaffleNumber(Number(event.target.value));
    };
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Button asChild className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                <Label htmlFor="picture">Subir imagen</Label>
                </Button>
                <Input id="number" type="number" value={raffleNumber} onChange={handleChangeNumber} className="text-black" />

                <Input 
                style={{display: "none"}}
                id="picture" 
                type="file" 
                accept="image/*" 
                onChange={selectImage} 
                className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
                />
            </div>	
            <ImagePreview paddedRaffleNumber={paddedRaffleNumber} previewImage={previewImage} />
        </main>
    );
}
