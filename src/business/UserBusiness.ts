import { UserDatabase } from "../database/UserDatabase"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { USER_ROLES, User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager, TokenPayload } from "../services/tokenManager"

export class UserBusiness {

  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManger: TokenManager,
    private hashManager: HashManager
  ) { }

  public signup = async (
    input: SignupInputDTO
  ): Promise<SignupOutputDTO> => {
    
    const {
      name,
      email,
      password
    } = input

    const id = this.idGenerator.generate()

    const userDBExists = await this.userDatabase.searchEmail(email)

    if (userDBExists) {
      throw new NotFoundError("esse email já está cadastrado")
    }
    const hashedPassword = await this.hashManager.hash(password)
    
    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL, 
      new Date().toISOString()
    )

    const newUserDB = newUser.toDBModel()
    await this.userDatabase.signup(newUserDB)

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole()
    }

    const token = this.tokenManger.createToken(tokenPayload)

    const output: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso!",
      token: token
    }

    return output
  }

  public login =async (input : LoginInputDTO) : Promise<LoginOutputDTO> => {
    const {
      email,
      password
    } = input

    const userDB = await this.userDatabase.searchEmail(email)

    if (!userDB) {
      throw new NotFoundError("email não encontrado")
    }

    const hashedPassword = userDB.password
    
    const passwordCorrect = await this.hashManager.compare(password, hashedPassword)
    
    if (!passwordCorrect) {
      throw new BadRequestError("email ou password incorretos")
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    const tokenPayload : TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    const token = this.tokenManger.createToken(tokenPayload)

    const output: LoginOutputDTO= {
      message: "Login realizado com sucesso!",
      token: token
    }

    return output
  }
}