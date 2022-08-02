import { Injectable } from "@nestjs/common";
import {
  INameFakeService,
  NameFake,
} from "src/application/common/services/namefake.interface";

const url = "https://api.namefake.com/denmark";

@Injectable()
export class NameFakeService implements INameFakeService {
  async getRandomNameFake(): Promise<NameFake> {

    const result = await fetch(url);

    if (!result.ok) {
      throw new Error("error");
    }

    const text = await result.text();

    const json = JSON.parse(text);

    return json;
  }
}
