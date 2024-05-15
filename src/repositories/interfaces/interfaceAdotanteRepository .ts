import AdotanteEntity from '../../entities/AdotanteEntity'
import EnderecoEntity from '../../entities/EnderecoEntity'

export default interface InterfaceAdotanteRepository {
  criaAdotante(
    adotante: AdotanteEntity,
  ): Promise<{ success: boolean; message?: string | undefined } | void>
  listaAdotantes(): Promise<AdotanteEntity[] | AdotanteEntity[]>
  atualizaAdotante(
    id: number,
    newData: AdotanteEntity,
  ): Promise<{ success: boolean; message?: string }> | void
  deletaAdotante(
    id: number,
  ): Promise<{ success: boolean; message?: string }> | void
  atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity,
  ): Promise<{ success: boolean; message?: string }> | void
}
