import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ValueEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  vid!: number;

  @Column({ nullable: false })
  key!: string;

  @Column({ nullable: false })
  value!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
