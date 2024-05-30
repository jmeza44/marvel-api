import { AuditableEntity } from 'src/shared/entities/auditable.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['username', 'characterId'], { unique: true })
export class UserFavoriteCharacter extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  characterId: number;
}
