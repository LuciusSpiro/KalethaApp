import { Member } from "./member.model";

export class Con {
  name: string = "";
  planDoc: string = "";
  conLink: string = "";
  description: string = "";
  date: Date = new Date();
  time: Date = new Date();
  members: Array<Member> = [];
}
