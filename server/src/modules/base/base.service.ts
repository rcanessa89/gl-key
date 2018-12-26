import 'automapper-ts/dist/automapper';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindConditions, DeleteResult, UpdateResult } from 'typeorm';
import { IBaseService } from './base.interface';
import { MapperService } from '@services/mapper/mapper.service';

export abstract class BaseService<T> implements IBaseService<T> {
  public withMap: boolean;
  private readonly mapping: (config: AutoMapperJs.ICreateMapFluentFunctions) => void;
  protected readonly repository: Repository<T>;
  protected readonly mapper: AutoMapperJs.AutoMapper;

  constructor(
    repository: Repository<T>,
    mapping: (config: AutoMapperJs.ICreateMapFluentFunctions) => void = null,
  ) {
    this.repository = repository;
    this.withMap = !!mapping;
    this.mapping = mapping;
    this.mapper = automapper;

    if (this.withMap) {
      this.initializeMapper();
    }
  }

  public async find(filter: FindManyOptions<T> & FindConditions<T> = {}): Promise<T[]> {
    return this.repository.find(filter);
  }

  public async findById(id: string | number): Promise<T> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new HttpException('ID invalid', HttpStatus.BAD_REQUEST);
    }

    return this.repository.findOne(parsedId);
  }

  public async findOne(filter: FindConditions<T>): Promise<T> {
    return this.repository.findOne(filter);
  }

  // item param type should be type T but there is an issue with third party library.
  public async create(item: any): Promise<T> {
    return this.repository.save(item);
  }

  // item param type should be type T but there is an issue with third party library.
  public async update(id: string | number, item: any): Promise<UpdateResult> {
    return this.repository.update(id, item);
  }

  public async delete(id: string | number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public async count(): Promise<number> {
    return this.repository.count();
  }

  public async map(object: T | Partial<T>): Promise<Partial<T>> {
    return this.mapper.map(this.modelName, this.viewModelName, object);
  }

  private get modelName(): string {
    const target: any = this.repository.target;

    return target.name;
  }

  private get viewModelName(): string {
    const modelName = this.modelName;

    return `${modelName}VM`;
  }

  private initializeMapper(): void {
    const createMapConfig = this.mapper
      .createMap(this.modelName, this.viewModelName);

    this.mapping(createMapConfig);
  }
}
