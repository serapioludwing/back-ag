import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { EmployeeService } from '../../application/service/employee.service';
import { CreateEmployeeDto } from '../../domain/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../domain/dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/application/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(+id);
  }
}
