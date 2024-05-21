import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ length: 100 })
  name: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column()
  passwordHash: string = "";

  @Column()
  passwordSalt: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
