import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn({
    unique: true,
    update: false
  })
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    type: 'simple-json'
  })
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };

  @Column()
  phone: string;

  @Column()
  website: string;
}
