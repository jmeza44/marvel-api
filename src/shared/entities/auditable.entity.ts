import { Entity, BaseEntity, Column } from 'typeorm';

@Entity()
export class AuditableEntity extends BaseEntity {
  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: true })
  modifiedAt: Date;

  @Column({ nullable: true })
  modifiedBy: string;
}
