
const BASE_URL = import.meta.env.VITE_BASE_URL;
 
export const getMediaUrl = (url: string) => {
if (url.startsWith("http")) return url;
return `${BASE_URL}/${url}`;
};