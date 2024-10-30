import { InvokeEndpointInput } from "aws-sdk/clients/sagemakerruntime";
import Prediction from "../../../../../public/response.json";
import AWS from "aws-sdk";
import { readFile } from "fs/promises";
import { writeFile } from "fs";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("image") as Blob | null;
  if (!file) {
    return Response.json({ error: "File blob is required." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const {
    AWS_ACCESS_KEY_ID: accessKeyId,
    AWS_SECRET_ACCESS_KEY: secretAccessKey,
    AWS_REGION: region,
    AWS_SAGEMAKER_ENDPOINT: endpointName,
  } = process.env;

  await writeFile(
    "src/app/api/v1/prediction/test.jpeg",
    buffer,
    "base64",
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });

  const sagemaker = new AWS.SageMakerRuntime();
  if (file) {
    const params: InvokeEndpointInput = {
      EndpointName: endpointName ?? "", // Replace with your endpoint name
      Body: buffer,
      ContentType: "application/x-image",
      Accept: "application/json",
    };

    try {
      if (params?.Body) {
        const response = await sagemaker.invokeEndpoint(params).promise();
        return Response.json(
          JSON.parse(Buffer.from(response.Body as Uint8Array).toString("utf8"))
        );
      }
    } catch (error) {
      console.error("Error invoking SageMaker endpoint:", error);
      throw error;
    }
  }
  return Response.json(Prediction);
}
