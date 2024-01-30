import Image from "next/image";

const ImagePreview = ({ previewImage, paddedRaffleNumber }: { previewImage: string, paddedRaffleNumber: string }) => {
    return (
        <div className="relative mix-blend-lighten w-[120vh] h-[]">
            {previewImage && (
                <>
                    <Image 
                        src={previewImage} 
                        alt="" 
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="absolute h-[] w-full object-cover object-right "

                    />
                    <div className="absolute h-[20vh] w-[30vh] object-cover object-right mx-44 mt-44 sm:mx-72 sm:mt-72" >{paddedRaffleNumber}</div>
                  
                </>
            )}
        </div>
    );
};

export default ImagePreview;
