import { Column, Sequelize } from 'sequelize-typescript';

export abstract class AuditColumns {
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  updatedAt: Date;
}
