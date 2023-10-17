import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
//prueba
interface Options {
    headers?: HeadersInit;
}

const fetchJsonUtil = (url: string, options: Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    (options.headers as Headers).set("Authentication", localStorage.getItem("auth"));
    return fetchUtils.fetchJson(url, options);
};


export const dataProvider = jsonServerProvider("http://127.0.0.1:1337", fetchJsonUtil);
// import { fetchUtils, withLifecycleCallbacks } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';

// interface Options {
//     headers?: HeadersInit;
// }

// const fetchJsonUtil = (url: string, options: Options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: "application/json" });
//     }
//     (options.headers as Headers).set("Authentication", localStorage.getItem("auth"));
//     return fetchUtils.fetchJson(url, options);
// };

// const baseDataProvider = jsonServerProvider("http://127.0.0.1:1337", fetchJsonUtil);

// const dataProvider = withLifecycleCallbacks(baseDataProvider, [
//     {
//         resource: 'Tickets',
//         beforeUpdate: async (params) => {
//             const newPictures = params.data.pictures.filter(
//                 p => p.rawFile instanceof File
//             );
//             const formerPictures = params.data.pictures.filter(
//                 p => !(p.rawFile instanceof File)
//             );

//             const base64Pictures = await Promise.all(
//                 newPictures.map(convertFileToBase64)
//             )
//             const pictures = [
//                 ...base64Pictures.map((dataUrl, index) => ({
//                     src: dataUrl,
//                     title: newPictures[index].name,
//                 })),
//                 ...formerPictures,
//             ];
//             return {
//                 ...params,
//                 data: { ...params.data, pictures }
//             };
//         }
//     }
// ]);

// /**
//  * Convert a `File` object returned by the upload input into a base 64 string.
//  * That's not the most optimized way to store images in production, but it's
//  * enough to illustrate the idea of data provider decoration.
//  */
// const convertFileToBase64 = file =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file.rawFile);
//     });

// export default dataProvider;
