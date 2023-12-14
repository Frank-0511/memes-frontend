import { ApiParamsGetMemes, ApiResponseGetMemes } from "@/models/meme";

import { MemeSchemaType } from "@/app/memes/components/FormCreate/schema";

const getMemesApi = async ({
  page,
  pageSize,
  token,
}: ApiParamsGetMemes): Promise<ApiResponseGetMemes> => {
  let dataResponse: ApiResponseGetMemes = {
    data: [],
    meta: {
      page: 0,
      pageSize: 0,
      count: 0,
      totalPage: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/meme?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dataResponse = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return dataResponse;
  }
};

const createMemeApi = async (
  data: MemeSchemaType,
  token: string
): Promise<any> => {
  let dataResponse: any = {};
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/meme`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    dataResponse = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return dataResponse;
  }
};

export { getMemesApi, createMemeApi };
