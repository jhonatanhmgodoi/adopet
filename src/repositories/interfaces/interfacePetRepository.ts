import PetEntity from '../../entities/PetEntity'
import EnumPorte from '../../enum/EnumPorte'

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void
  listaPet(): Promise<Array<PetEntity>> | Array<PetEntity>
  atualizaPet(
    id: number,
    newData: PetEntity,
  ): Promise<{ success: boolean; message?: string }>
  deletaPet(id: number, pet: PetEntity): void
  adotaPet(
    idPet: number,
    idAdotante: number,
  ): Promise<{ success: boolean; message?: string }>
  buscaPetPorCampoGenerico<T extends keyof PetEntity>(
    campo: T,
    valor: PetEntity[T],
  ): Promise<PetEntity[]> | PetEntity[]
}
