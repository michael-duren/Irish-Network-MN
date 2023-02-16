import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../../utils/api";
import toast from "react-hot-toast";

type UploadImageProps = {
  setImageUrl: Dispatch<SetStateAction<string>>;
};

const UploadImage = ({ setImageUrl }: UploadImageProps) => {
  const { mutateAsync: uploadImageToServer, isLoading: isImageLoading } =
    api.event.uploadImage.useMutation({
      onSuccess: () => {
        toast.success("YOU DID IT 🎉");
      },
      onError: (error) => console.log(error),
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      if (i.size > 2.5 * 1000000) {
        return toast.error("Image may not be bigger than 2.5MB");
      }

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      const fileReader = new FileReader();

      fileReader.readAsDataURL(i);

      fileReader.onloadend = async () => {
        if (fileReader.result) {
          const imageUrl = await uploadImageToServer({
            imageBase64DataURI: fileReader.result as string,
          });

          setImageUrl(imageUrl);
          console.log(imageUrl);
        }
      };
    }
  };

  return (
    <label
      id="event-image"
      htmlFor="event-image"
      className="flex w-full flex-1 justify-end"
    >
      <input
        id="event-image-button"
        name="event-image"
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        disabled={isImageLoading}
        multiple={false}
      />
      Choose image or <b>drag and drop</b>
    </label>
  );
};

export default UploadImage;
