const functions = {};
const url = `http://${window.location.hostname}:5000/`;

const getAll = async (input, headers = {}) => {
  // const Authorization = localStorage.getItem("key")
  const head = setHeaders(headers);
  const resp = await fetch(`${url}${input}`, {
    headers: head,
  });
  const data = await resp.json();

  return data;
};

const deleteOne = async (id, options, headers = {}) => {
  const resp = await fetch(`${url}${options}/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers,
  });
  return await resp.json();
};

const setHeaders = (headers) => {
  return {
    ...headers,
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization,
  };
};

const updateOne = async (id, options, body = {}, headers = {}) => {
  const head = setHeaders(headers);
  console.log(url);
  const resp = await fetch(`${url}${options}/${id}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(body),
    headers: head,
    dataType: "json",
  });
  return await resp.json();
};

const addOne = async (options, body = {}, headers = {}) => {
  const head = setHeaders(headers);
  const resp = await fetch(`${url}${options}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: head,
    dataType: "json",
  });
  return await resp.json();
};

functions.getAll = getAll;
functions.deleteOne = deleteOne;
functions.updateOne = updateOne;
functions.addOne = addOne;

export default functions;
