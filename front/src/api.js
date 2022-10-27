const api_url = process.env.REACT_APP_NODE_API;
export const getFlickr = async () => {
  const response = await fetch(`${api_url}/flickrs`);
  const res = await response.json();
  return res;
};

export const searchByTag = async (searchValue) => {
  const params = new URLSearchParams();
  params.append(`tags`, searchValue);

  const res = await fetch(`${api_url}/search?${params}`);
  const res_json = await res.json();
  return res_json;
};
