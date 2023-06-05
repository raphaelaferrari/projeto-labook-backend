"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const User_1 = require("../models/User");
class UserBusiness {
    constructor(userDatabase, idGenerator, tokenManger, hashManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenManger = tokenManger;
        this.hashManager = hashManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            const id = this.idGenerator.generate();
            const userDBExists = yield this.userDatabase.searchEmail(email);
            if (userDBExists) {
                throw new NotFoundError_1.NotFoundError("esse email já está cadastrado");
            }
            const hashedPassword = yield this.hashManager.hash(password);
            const newUser = new User_1.User(id, name, email, hashedPassword, User_1.USER_ROLES.NORMAL, new Date().toISOString());
            const newUserDB = newUser.toDBModel();
            yield this.userDatabase.signup(newUserDB);
            const tokenPayload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const token = this.tokenManger.createToken(tokenPayload);
            const output = {
                message: "Cadastro realizado com sucesso!",
                token: token
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const userDB = yield this.userDatabase.searchEmail(email);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError("email não encontrado");
            }
            const hashedPassword = userDB.password;
            const passwordCorrect = yield this.hashManager.compare(password, hashedPassword);
            if (!passwordCorrect) {
                throw new BadRequestError_1.BadRequestError("email ou password incorretos");
            }
            const user = new User_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.created_at);
            const tokenPayload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManger.createToken(tokenPayload);
            const output = {
                message: "Login realizado com sucesso!",
                token: token
            };
            return output;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map