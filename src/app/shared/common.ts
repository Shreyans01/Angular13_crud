// const RoutePath = "http://103.232.124.170:11111/";
const RoutePath = "https://dummyapi.io/"
//Ajaybhai IP
// const RoutePath = "http://192.168.1.204:11111/"
// const RoutePath = "http://192.168.1.102:11112/" //(ajay sir)
// const RoutePath = "http://192.168.1.213:11112/"

//(dhwani ma'am)
// const RoutePath = "http://192.168.1.254:11111/"

export const Apiurl = {
    getAllUsers: RoutePath + "data/v1/user",
    getUserById: RoutePath + "data/v1/user?id=",
    createUser: RoutePath + "data/v1/user/create",
    updateUser: RoutePath + 'data/v1/user',
    deleteUser: RoutePath + 'data/v1/user/',
}
