import Image from "next/image";

export const ImagePreview = ({ src }: { src: string }) => (
  <div>
    <Image
      src={src}
      alt={"Uploaded image"}
      width={500}
      height={500}
      style={{ objectFit: "contain" }}
    />
  </div>
);
