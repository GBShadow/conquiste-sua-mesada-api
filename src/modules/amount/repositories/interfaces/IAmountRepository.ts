import Amount from 'modules/amount/typeorm/entities/Amount';
import ICreateAmountDTO from 'modules/amount/dtos/ICreateAmountDTO';

type IAmountRepository = {
  findById(id: number): Promise<Amount | undefined>;
  findByKidId(kid_id: number): Promise<Amount | undefined>;
  findAll(kid_id: number): Promise<Amount[] | []>;
  create(data: ICreateAmountDTO): Promise<Amount>;
  save(data: ICreateAmountDTO): Promise<Amount>;
};

export default IAmountRepository;
