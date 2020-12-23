
import request from '../http-common';


class ExchangeDataService {

    async linkAccount(data) {
        return request.post("/exchange/link", {data});
    }

}

export default new ExchangeDataService();