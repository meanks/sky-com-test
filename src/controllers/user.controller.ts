import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';
import { User } from '../entity/User';

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userRepository = getMongoRepository(User);
  const newUser = userRepository.create(req.body);
  const result = await userRepository.save(newUser);
  return res.json({ msg: 'success', data: result });
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = +(req.query.page as any) || 1;
  const take: number = 10;
  let options: any = {
    take,
    skip: (page - 1) * take
  };
  if (req.query.qs) {
    options = {
      ...options,
      where: {
        $or: [
          { name: new RegExp(req.query.qs.toString(), 'i') },
          { email: new RegExp(req.query.qs.toString(), 'i') }
        ]
      }
    };
  }
  const userRepository = getMongoRepository(User);
  const users = await userRepository.find(options);
  return res.json({ msg: 'success', data: users });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userRepository = getMongoRepository(User);
  const user = await userRepository.findOne(req.params.id);
  if (user) {
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    return res.json({ msg: 'success', data: result });
  }
  return res.json({ msg: 'no user found', data: null });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = getMongoRepository(User);
  await userRepository.delete(req.params.id);
  return res.json({ msg: 'success', data: null });
};
