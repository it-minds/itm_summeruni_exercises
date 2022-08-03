import { Inject, Injectable } from "@nestjs/common";
import { ITokenService } from "src/application/common/interfaces/auth/token.interface";
import { AuthorEntity } from "src/domain/author.entity";
import { CacheService } from "../cache.service";

@Injectable()
export class AuthorsSeedService {
  constructor(
    @Inject("ITokenService") private tokenService: ITokenService,
    @Inject(CacheService) private cacheService: CacheService
  ) {}

  private readonly key = "authors";

  async seed() {
    for (let i = 0; i < data.length; i++) {
      const author = data[i];
      author.password = await this.tokenService.hashPassword(author.password);
    }
    console.table(data);

    await this.cacheService.set(this.key, JSON.stringify(data));
  }
}

const data: AuthorEntity[] = [
  {
    id: 1,
    name: "Rosalyn",
    password: "Hobbs",
  },
  {
    id: 2,
    name: "Blake",
    password: "Hyde",
  },
  {
    id: 3,
    name: "Sasha",
    password: "Sparks",
  },
  {
    id: 4,
    name: "Phyllis",
    password: "Wells",
  },
  {
    id: 5,
    name: "Clarissa",
    password: "Mack",
  },
  {
    id: 6,
    name: "Trevino",
    password: "Serrano",
  },
  {
    id: 7,
    name: "Felecia",
    password: "Whitley",
  },
  {
    id: 8,
    name: "Cora",
    password: "Davenport",
  },
  {
    id: 9,
    name: "Melisa",
    password: "Burton",
  },
  {
    id: 10,
    name: "Violet",
    password: "Hopper",
  },
  {
    id: 11,
    name: "Brown",
    password: "Austin",
  },
  {
    id: 12,
    name: "Lessie",
    password: "Guerra",
  },
  {
    id: 13,
    name: "Taylor",
    password: "Hickman",
  },
  {
    id: 14,
    name: "Sherri",
    password: "Kinney",
  },
  {
    id: 15,
    name: "Margaret",
    password: "Mullen",
  },
  {
    id: 16,
    name: "Kristy",
    password: "Newman",
  },
  {
    id: 17,
    name: "Noemi",
    password: "Oliver",
  },
  {
    id: 18,
    name: "Trisha",
    password: "Stokes",
  },
  {
    id: 19,
    name: "Hendrix",
    password: "Morgan",
  },
  {
    id: 20,
    name: "Mann",
    password: "Patterson",
  },
];
