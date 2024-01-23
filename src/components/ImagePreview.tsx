import Image from "next/image";

const ImagePreview = ({ previewImage, paddedRaffleNumber }: { previewImage: string, paddedRaffleNumber: string }) => {
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            {previewImage && (
                <div>
                    <Image 
                        src={previewImage} 
                        alt="" 
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <div>{paddedRaffleNumber}</div>
                </div>
            )}
        </div>
    );
};

export default ImagePreview;
