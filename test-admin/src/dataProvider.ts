import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

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


export const dataProvider = jsonServerProvider("https://127.0.0.1:1337", fetchJsonUtil);
