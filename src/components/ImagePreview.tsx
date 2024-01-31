import Image from "next/image";

const ImagePreview = ({ previewImage, paddedRaffleNumber }: { previewImage: string, paddedRaffleNumber: string }) => {
    return (
        <div className="bg-auto bg-no-repeat w-full h-screen" style={{backgroundImage: `url(${previewImage})`}} >
            {previewImage && (
                <div className={`inset-0 flex justify-center z-10 ml-[278px]`}>  
                    {paddedRaffleNumber}
                </div>
            )}
        </div>
    );
};

export default ImagePreview;
