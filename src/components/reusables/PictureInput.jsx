import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";

const MAX_IMAGES = 5;

const PictureInput = () => {
  const [image, setImage] = useState([]);

  const onDrop = useCallback((acceptedImages) => {
    setImage((prevImage) => {
      const newImage = [...prevImage, ...acceptedImages];
      return newImage.slice(0, MAX_IMAGES);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    disabled: image.length >= MAX_IMAGES,
  });

  const handleRemoveImage = (index) => {
    setImage((prevImage) => prevImage.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    image.forEach((file) => {
      formData.append("images", file);
    });
  };

  const renderImagePreview = (image, index) => {
    return (
      <img
        src={URL.createObjectURL(image)}
        alt={`Image ${index + 1}`}
        className="object-cover w-full h-full"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-lg ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        } ${image.length >= MAX_IMAGES ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Input {...getInputProps()} />
        {image.length >= MAX_IMAGES ? (
          <p className="text-center text-red-500">
            Maximum number of files reached
          </p>
        ) : isDragActive ? (
          <p className="text-center text-blue-500">Drop the files here ...</p>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Drag 'n' drop some images here, or click to select files (max 5
            photos)
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {image.map((file, index) => (
          <div
            key={index}
            className="relative w-32 h-32 overflow-hidden border rounded-lg group"
          >
            {renderImagePreview(file, index)}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default PictureInput;
