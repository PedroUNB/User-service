import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  CreatedAt,
  UpdatedAt,
  Unique,
  AllowNull
} from 'sequelize-typescript';

@Table({ freezeTableName: true, tableName: 'user', timestamps: true, underscored: true })
export class UserModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Unique(true)
  @Column(DataType.UUIDV4)
  id!: string;

  @Unique(false)
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column(DataType.DATE)
  removedAt: Date;
}
