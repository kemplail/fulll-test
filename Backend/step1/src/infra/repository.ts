import { Model } from "../domain/model";

export class Repository<T extends Model> {
  public data: T[];

  constructor() {
    this.data = [];
  }

  async findById(id: number): Promise<T | undefined> {
    return this.data.find((element: T) => element.getId() === id);
  }

  async insert(elementToInsert: T) {
    this.data.push(elementToInsert);
  }

  async replace(elementToReplace: T, index: number) {
    this.data.splice(index, 1, elementToReplace);
  }

  async save(elementToSave: T): Promise<T> {
    const searchedElementIndex: number = this.data.findIndex(
      (element: T) => element.getId() === elementToSave.getId()
    );

    if (searchedElementIndex !== -1) {
      this.replace(elementToSave, searchedElementIndex);
    } else {
      this.insert(elementToSave);
    }

    return elementToSave;
  }
}
