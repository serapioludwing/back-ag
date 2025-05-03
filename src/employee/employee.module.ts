import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './domain/entity/employee.entity';
import { EmployeeService } from './application/service/employee.service';
import { EmployeeController } from './infrastructure/controller/employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
