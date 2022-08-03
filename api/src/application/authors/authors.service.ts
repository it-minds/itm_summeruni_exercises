import { Inject, Injectable } from "@nestjs/common";
import {  IApplicationContext } from "../common/services/applicationcontext.interface";
import { ICurrentUserService } from "../common/services/auth/currentuser.interface";
import { Author } from "./models/author.model";

@Injectable()
export class AuthorsService {
  constructor(
    @Inject("IApplicationContext") private applicationContext: IApplicationContext,
    @Inject("ICurrentUserService") private currentUserService: ICurrentUserService

  ) {}

  async findMe() {
    return await this.findOneById(this.currentUserService.getUserId());
  }

  async findOneById(id: number): Promise<Author> {

    const author = await this.applicationContext.authors.getById(id);
    
    if (!author) {
      throw new Error("404 - not found")
    }

    // const posts = await this.applicationContextPostEntity.queryForMany({
    //   authorId: author.id
    // })

    const dto = new Author({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,

      // posts: posts.map(post => new Post({
      //   id: post.id,
      //   text: post.text,
      //   timestamp: post.timestamp
      // }))
    })

    return dto;    
  }
}
