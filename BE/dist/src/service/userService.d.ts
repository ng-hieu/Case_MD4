declare class UserService {
    private userRepository;
    constructor();
    getAllUsers: () => Promise<any>;
    registerUser: (user: any) => Promise<any>;
    checkUserRegister: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
