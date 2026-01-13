interface returnResponse {
  status: "success" | "error";
  message: string;
  data: {} | [];
}

export type {returnResponse};