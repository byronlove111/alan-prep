import db from "../../db/database";
import { MemberRecord } from "../types";

export class MembersRepository {
  findById(memberId: string): MemberRecord | undefined {
    return db
      .prepare("SELECT * FROM members WHERE id = ?")
      .get(memberId) as MemberRecord | undefined;
  }
}
