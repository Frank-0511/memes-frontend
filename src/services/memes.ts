import { ApiParamsGetMemes, ApiResponseGetMemes } from "@/models/meme";

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

export { getMemesApi };
