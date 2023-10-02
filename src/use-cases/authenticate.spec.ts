import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'teste@example.com',
      passwordHash: await hash('123456', 8),
    })

    const { user } = await sut.execute({
      email: 'teste@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with worng email', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'teste@example.com',
      passwordHash: await hash('123456', 8),
    })

    await expect(() => 
      sut.execute({
        email: 'teste2@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with worng password', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'teste@example.com',
      passwordHash: await hash('123456', 8),
    })

    await expect(() => 
      sut.execute({
        email: 'teste2@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})