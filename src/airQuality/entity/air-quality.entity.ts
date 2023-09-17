import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { AuditColumns } from 'src/bootstrap/database/audit-columns.entity';

@Table({ modelName: 'airQuality', timestamps: true })
export class AirQuality extends Model<AirQuality, AuditColumns> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  ts: string;

  @Column({
    type: DataType.INTEGER,
  })
  aqius: number;

  @Column({
    type: DataType.STRING,
  })
  mainus: string;

  @Column({
    type: DataType.INTEGER,
  })
  aqicn: number;

  @Column({
    type: DataType.STRING,
  })
  maincn: string;

  @Column({
    type: DataType.FLOAT,
  })
  latitude: number;

  @Column({
    type: DataType.FLOAT,
  })
  longitude: number;
}
