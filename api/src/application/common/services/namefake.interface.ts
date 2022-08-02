export interface NameFake {
  name: string;
  email: string;
}

export interface INameFakeService {
  getRandomNameFake(): Promise<NameFake>;
}
