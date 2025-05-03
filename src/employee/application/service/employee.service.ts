import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../../domain/entity/employee.entity';
import { CreateEmployeeDto } from '../../domain/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../domain/dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) { }

  async create(data: CreateEmployeeDto): Promise<EmployeeEntity> {
    const employee = this.employeeRepository.create(data);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<EmployeeEntity[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) throw new NotFoundException('Empleado no encontrado');
    return employee;
  }

  async update(id: number, data: UpdateEmployeeDto): Promise<EmployeeEntity> {
    await this.findOne(id);
    await this.employeeRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.employeeRepository.delete(id);
  }
}
