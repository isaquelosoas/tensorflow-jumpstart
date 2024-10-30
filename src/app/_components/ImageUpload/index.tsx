import { IImageUpload } from "./interfaces";

export const ImageUpload = ({ onImageChange, onSubmitImage }: IImageUpload) => (
  <form>
    <input
      type="file"
      accept="image/*"
      capture="environment"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onImageChange(file);
      }}
    />
    <button type="submit" onClick={onSubmitImage}>
      Submit
    </button>
  </form>
);
