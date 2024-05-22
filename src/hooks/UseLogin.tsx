// import {useMutation, UseMutationResult} from "react-query";
// import {login} from "../servies/login.ts";
//
// interface LoginParams   {
//     username: string;
//     password: string;
// }
//
// const UseLogin = (): UseMutationResult<string, LoginParams> => {
//     return useMutation<string, unknown, LoginParams>({
//         mutationKey: ["login"],
//         mutationFn: ({ username, password }) => {
//             return login(username, password);
//         },
//     });
// };
//
// export default UseLogin;