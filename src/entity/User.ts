import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id?: ObjectID;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion?: number;
}
