import Kid from 'modules/kids/typeorm/entities/Kid';
import ICreateKidDTO from 'modules/kids/dtos/ICreateKidDTO';

type IKidsRepository = {
  findByName(name: string): Promise<Kid | undefined>;
  findById(id: number): Promise<Kid | undefined>;
  findAll(): Promise<Kid[] | []>;
  delete(id: number): Promise<void>;
  create(data: ICreateKidDTO): Promise<Kid>;
  save(data: ICreateKidDTO): Promise<Kid>;
};

export default IKidsRepository;
