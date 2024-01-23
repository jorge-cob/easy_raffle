import Image from "next/image";

const ImagePreview = ({ previewImage, paddedRaffleNumber }) => {
     return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            {previewImage && (
                <div>
                    <Image 
                        src={previewImage} 
                        alt="" 
                        style={styles.image}
                    />
                    <div>{paddedRaffleNumber}</div>
                </div>
            )}
        </div>
    );
}

const styles = {
    image: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px'
    }
}

export default ImagePreview;