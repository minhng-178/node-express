export const PUBLIC_API = "http://localhost:5000/api";

if (!PUBLIC_API) {
  throw new Error("Can not get API!");
}
