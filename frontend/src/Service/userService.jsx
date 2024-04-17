import axios from "axios";
let baseUrl = "http://localhost:5000/"

class UserService{

    getData(){
        return axios.get(baseUrl + "data");
    }
}
export default new UserService();