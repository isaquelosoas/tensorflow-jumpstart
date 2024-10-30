import { MouseEvent } from "react";

export interface IImageUpload {
  onImageChange: (file: File) => void;
  onSubmitImage: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
}
