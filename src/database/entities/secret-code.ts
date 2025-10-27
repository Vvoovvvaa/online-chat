import { Column, Entity, ManyToOne } from "typeorm";
import { Base,User } from ".";

@Entity()
export class SecretCode extends Base{
    @Column()
    code:string

    @ManyToOne(() => User,(user) => user.secretCodes,{onDelete: 'SET NULL'})
    user:User
}