export const ImageUpload = ({
  onImageChange,
}: {
  onImageChange: (file: File) => void;
}) => (
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
  </form>
);
