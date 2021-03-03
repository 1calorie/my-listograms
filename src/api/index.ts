interface IBaseRequest {
    url: string;
}

interface IGet extends IBaseRequest {
    type: "get";
}

type TRequest = IGet;

async function sendRequest(request: TRequest): Promise<Response> {
    const { url } = request;
    return await fetch(url);
}

async function getJson(url: string): Promise<Response> {
    return await sendRequest({
        url,
        type: 'get',
    });
}

export {
    getJson,
};
