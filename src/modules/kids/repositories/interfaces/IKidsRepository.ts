import Kid from 'modules/kids/typeorm/entities/Kid';
import ICreateKidDTO from 'modules/kids/dtos/ICreateKidDTO';
import IFindByNameDTO from 'modules/kids/dtos/IFindByNameDTO';

type IKidsRepository = {
  findByName(data: IFindByNameDTO): Promise<Kid | undefined>;
  findById(id: number): Promise<Kid | undefined>;
  findAll(user_id: number): Promise<Kid[] | []>;
  delete(id: number): Promise<void>;
  create(data: ICreateKidDTO): Promise<Kid>;
  save(data: ICreateKidDTO): Promise<Kid>;
};

export default IKidsRepository;
