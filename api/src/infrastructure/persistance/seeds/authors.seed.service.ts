import { Inject, Injectable } from "@nestjs/common";
import { INameFakeService } from "src/application/common/services/namefake.interface";
import { AuthorEntity } from "src/domain/author.entity";
import { CacheService } from "../cache.service";

@Injectable()
export class AuthorsSeedService {
  constructor(
    @Inject("INameFakeService") private nameFakeService: INameFakeService,
    @Inject(CacheService) private cacheService: CacheService
  ) {}

  private readonly key = "authors";

  async seed() {   
    await this.cacheService.set(this.key, JSON.stringify(data));
  }
}

const data : AuthorEntity[] = <any>[
  {
    "_id": "62ea26f3644d2713f85d8919",
    "id": 0,
    "guid": "55337f6e-7a8b-42d9-b4a9-b310d9a9b5c9",
    "firstname": "Mann",
    "lastname": "Patterson"
  },
  {
    "_id": "62ea26f38f3924196cbe0f79",
    "id": 1,
    "guid": "0aecf8aa-6d93-4f5f-a5ac-c50ddaad6004",
    "firstname": "Rosalyn",
    "lastname": "Hobbs"
  },
  {
    "_id": "62ea26f303c3588284b610b8",
    "id": 2,
    "guid": "e57f37ee-2fbe-4ac5-b5ff-f107ed3d0ec3",
    "firstname": "Blake",
    "lastname": "Hyde"
  },
  {
    "_id": "62ea26f3011a7fc846386f78",
    "id": 3,
    "guid": "8e0203e7-c4f0-4352-af40-b97f6f2c2e63",
    "firstname": "Sasha",
    "lastname": "Sparks"
  },
  {
    "_id": "62ea26f3f8ddd1284210b46a",
    "id": 4,
    "guid": "387b9b20-d36f-4dde-9f5e-5152f77aef13",
    "firstname": "Phyllis",
    "lastname": "Wells"
  },
  {
    "_id": "62ea26f3f28ed34b0ba93dc3",
    "id": 5,
    "guid": "2e06f6d3-36e8-4ecf-bf43-032223a2cc11",
    "firstname": "Clarissa",
    "lastname": "Mack"
  },
  {
    "_id": "62ea26f3289c0c60022a86a4",
    "id": 6,
    "guid": "34eabb23-20a4-42d8-90ef-93d52e96a2bd",
    "firstname": "Trevino",
    "lastname": "Serrano"
  },
  {
    "_id": "62ea26f38e27202a727be98d",
    "id": 7,
    "guid": "31c52695-1be5-4b0f-b7f7-c904325e4885",
    "firstname": "Felecia",
    "lastname": "Whitley"
  },
  {
    "_id": "62ea26f34daa64bf17aa8110",
    "id": 8,
    "guid": "0da5270c-79e4-4258-8e47-6030a48b745e",
    "firstname": "Cora",
    "lastname": "Davenport"
  },
  {
    "_id": "62ea26f3291a590ede3aa952",
    "id": 9,
    "guid": "7d02c763-6c9f-4b10-87f5-2ed3158d3570",
    "firstname": "Melisa",
    "lastname": "Burton"
  },
  {
    "_id": "62ea26f3653cc47fc330d94b",
    "id": 10,
    "guid": "bf2db245-54c4-4265-bbe1-fee1ed5f02d4",
    "firstname": "Violet",
    "lastname": "Hopper"
  },
  {
    "_id": "62ea26f3538f36e0fee1970b",
    "id": 11,
    "guid": "d69bb513-6274-4391-a321-47c210d33900",
    "firstname": "Brown",
    "lastname": "Austin"
  },
  {
    "_id": "62ea26f3730708e684ffda39",
    "id": 12,
    "guid": "6760a72d-94d7-4e08-b39a-723dba0fb70b",
    "firstname": "Lessie",
    "lastname": "Guerra"
  },
  {
    "_id": "62ea26f3a75e4471043f4331",
    "id": 13,
    "guid": "40677090-a38d-44e8-94e1-618d5998829c",
    "firstname": "Taylor",
    "lastname": "Hickman"
  },
  {
    "_id": "62ea26f35eb1f055f0dc6b17",
    "id": 14,
    "guid": "47016702-be8e-42e8-9a5e-11a5be3825c7",
    "firstname": "Sherri",
    "lastname": "Kinney"
  },
  {
    "_id": "62ea26f3112e80586737324b",
    "id": 15,
    "guid": "cea99013-3221-42d8-9fb6-fa8e3ebb1fd2",
    "firstname": "Margaret",
    "lastname": "Mullen"
  },
  {
    "_id": "62ea26f31e3576b68f141938",
    "id": 16,
    "guid": "0637c365-69cb-4b50-889e-f9dea16a518d",
    "firstname": "Kristy",
    "lastname": "Newman"
  },
  {
    "_id": "62ea26f3c5ee34218db2e7ec",
    "id": 17,
    "guid": "3031105f-3bad-42a8-94f1-08a95e9df533",
    "firstname": "Noemi",
    "lastname": "Oliver"
  },
  {
    "_id": "62ea26f3886d97c15fac3c35",
    "id": 18,
    "guid": "1bacc9b9-4974-4367-8451-d288ca9d5501",
    "firstname": "Trisha",
    "lastname": "Stokes"
  },
  {
    "_id": "62ea26f371e69d2bd64ff1dd",
    "id": 19,
    "guid": "e99e15d7-9ee2-45d4-9ac9-e4641da8a449",
    "firstname": "Hendrix",
    "lastname": "Morgan"
  }
]