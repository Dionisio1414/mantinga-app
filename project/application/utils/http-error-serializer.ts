export default function httpErrorSerializer(error?: any) {
    if (!error) {
        return null;
    }

    if (error.response) {
        return {
            response: {
                data: error.response.data,
                status: error.response.status,
                statusText: error.response.statusText
            }
        };
    }

    return error || null;
}