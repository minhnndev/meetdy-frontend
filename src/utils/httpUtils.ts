export const headerApplicationJson = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const isSuccess = (statusCode: number) => {
  const successStatusCodes = [200, 201, 202, 204];
  if (successStatusCodes.includes(statusCode)) {
    return true;
  }
  return false;
};

export function getHeaderBearer(token?: string) {
  const accessToken = localStorage.get(["access-token"]) || token;
  const header = {
    ...headerApplicationJson,
    Authorization: "Bearer " + accessToken,
  };
  return header;
}
