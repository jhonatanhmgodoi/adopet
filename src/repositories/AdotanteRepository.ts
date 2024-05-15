import { Repository } from 'typeorm'
import AdotanteEntity from '../entities/AdotanteEntity'
import InterfaceAdotanteRepository from './interfaces/interfaceAdotanteRepository '
import EnderecoEntity from '../entities/EnderecoEntity'

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository
  }

  async criaAdotante(
    adotante: AdotanteEntity,
  ): Promise<{ success: boolean; message?: string | undefined } | void> {
    const { celular, nome, senha } = adotante
    if (!(celular || nome || senha)) {
      return {
        success: false,
        message: 'Campos celular, nome ou senha vazio(s)',
      }
    }
    await this.repository.save(adotante)
  }

  async listaAdotantes(): Promise<AdotanteEntity[] | AdotanteEntity[]> {
    return await this.repository.find()
  }

  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity,
  ): Promise<{ success: boolean; message?: string | undefined }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } })

      if (!adotanteToUpdate) {
        return {
          success: false,
          message: 'Adotante não encontrado',
        }
      }

      Object.assign(adotanteToUpdate, newData)

      await this.repository.save(adotanteToUpdate)

      return { success: true }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar o adotante',
      }
    }
  }

  async deletaAdotante(
    id: number,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } })

      if (!adotanteToRemove) {
        return {
          success: false,
          message: 'Adotante não encontrado',
        }
      }

      await this.repository.delete(adotanteToRemove)

      return { success: true }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: 'Ocorreu um erro ao deletar adotante',
      }
    }
  }

  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity,
  ): Promise<{ success: boolean; message?: string | undefined }> {
    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    })

    if (!adotante) {
      return { success: false, message: 'Adotante não encontrado' }
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado)
    adotante.endereco = novoEndereco

    await this.repository.save(adotante)

    return {
      success: true,
    }
  }
}
