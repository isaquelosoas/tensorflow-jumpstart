export const PredictionList = ({
  predictions,
}: {
  predictions: PredictionItem[];
}) => (
  <ol>
    {predictions.map((item, index) => (
      <li key={index}>
        {item.label}: {(item.probability * 100).toFixed(2)}%
      </li>
    ))}
  </ol>
);
