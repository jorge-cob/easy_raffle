'use client'

import ImagePreview from "@/components/ImagePreview";
import '@mantine/core/styles.css';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState, useEffect, useRef } from "react";

export default function Home() {
  
    const [raffleNumber, setRaffleNumber] = useState<number>(0);
    const [paddedRaffleNumber, setPaddedRaffleNumber] = useState<string>("0000");
    const [previewImage, setPreviewImage] = useState<string>("");
    const [isDragging, setDragging] = useState(false);
    const block = useRef(null);
    const frameID = useRef(0);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const dragX = useRef(0);
    const dragY = useRef(0);

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

    const handleHorizontalChange = (event: { target: { value: any; }; }) => {
        dragX.current = event.target.value;
        cancelAnimationFrame(frameID.current);
        frameID.current = requestAnimationFrame(() => {
            block.current.style.transform = `translate3d(${event.target.value}px, ${dragY.current}px, 0)`;
          });

    }
    const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    const handleMove = (e) => {
        if (!isDragging) {
          return;
        }
    
        const deltaX = lastX.current - e.pageX;
        const deltaY = lastY.current - e.pageY;
        lastX.current = e.pageX;
        lastY.current = e.pageY;
        dragX.current -= deltaX;
        dragY.current -= deltaY;
    
        cancelAnimationFrame(frameID.current);
        frameID.current = requestAnimationFrame(() => {
          block.current.style.transform = `translate3d(${dragX.current}px, ${dragY.current}px, 0)`;
        });

      };
    
      const handleMouseDown = (e) => {
        lastX.current = e.pageX;
        lastY.current = e.pageY;
        setDragging(true);
      };
    
      const handleMouseUp = () => {
        setDragging(false);
        
      };

      useEffect(() => {
        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleMouseUp);
    
        return () => {
          document.removeEventListener("mousemove", handleMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [isDragging]);
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Button asChild className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                <Label htmlFor="picture">Subir imagen</Label>
                </Button>
                <Input id="number" type="number" value={raffleNumber} onChange={handleChangeNumber} className="text-black" />
                <Input id="number" type="number" value={dragX.current} onChange={handleHorizontalChange} className="text-black" />

                <Input 
                style={{display: "none"}}
                id="picture" 
                type="file" 
                accept="image/*" 
                onChange={selectImage} 
                className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
                />
            </div>	
            <div
                ref={block}
                onMouseDown={handleMouseDown}
                style={{ height: 100, width: 100, border: "1px solid red" }}
            >
                {paddedRaffleNumber}
            </div>
            <ImagePreview paddedRaffleNumber={paddedRaffleNumber} previewImage={previewImage} />
        </main>
    );
}
