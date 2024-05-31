import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ResourceRating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  resourceId: string;

  @Column({ nullable: false })
  resourceType: string;

  @Column({ type: 'int', nullable: false })
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}
