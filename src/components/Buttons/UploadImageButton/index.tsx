import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

import { api } from "../../../utils/api";
import Spinner from "../../Spinners/Spinner";

type UploadImageProps = {
  setImageUrl: Dispatch<SetStateAction<string>>;
  directory: string;
};

const UploadImageButton = ({ setImageUrl, directory }: UploadImageProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { mutateAsync: uploadImageToServer, isLoading: isImageLoading } =
    api.event.uploadImage.useMutation({
      onSuccess: () => {
        toast.success("Successfully Uploaded Image 🎉");
        setIsDisabled(true);
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

      if (i.size > 1.5 * 1000000) {
        return toast.error("Image may not be bigger than 1.5MB");
      }

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      const fileReader = new FileReader();

      fileReader.readAsDataURL(i);

      fileReader.onloadend = async () => {
        if (fileReader.result) {
          const imageUrl = await uploadImageToServer({
            imageBase64DataURI: fileReader.result as string,
            directory,
          });

          setImageUrl(imageUrl);
          console.log(imageUrl);
        }
      };
    }
  };

  return (
    <div>
      {isImageLoading ? (
        <div>
          <Spinner color="text-red-400" size="text-2xl">
            Uploading Image...
          </Spinner>
        </div>
      ) : (
        <input
          id="event-image-button"
          className={`block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0  file:py-2 file:px-4 file:text-sm file:font-semibold ${
            isDisabled
              ? " file:bg-gray-300 file:text-gray-700 hover:file:bg-gray-200 "
              : " file:bg-green-50 file:text-green-700 hover:file:bg-green-200 "
          } file:active:scale-95`}
          name="event-image"
          type="file"
          accept="image/*"
          onChange={onChangeImage}
          disabled={isDisabled}
          multiple={false}
        />
      )}
    </div>
  );
};

export default UploadImageButton;

{
  /* <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */
}
