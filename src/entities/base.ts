import { PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";

export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })    //Poxelu e sik jamanakavorn e dracc
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })  // esel hetn poxel db i dzveluc hedo
  updatedAt: Date;
}