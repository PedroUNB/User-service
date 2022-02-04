import { Op } from 'sequelize';

export const getSqlOptions = {
  userListOptions(inputFilter) {
    const limit = inputFilter?.pagination?.first || null;
    const offset = inputFilter?.pagination?.offset || null;
    const order = inputFilter?.ordering?.orderBy || 'createdAt';
    const orientation = inputFilter?.ordering?.orientation || 'ASC';
    const argument = inputFilter?.filter?.argument || null;

    const where = argument
      ? {
          [Op.or]: [{ name: { [Op.iLike]: `%${inputFilter?.filter?.argument}%` } }],
          removed_at: null
        }
      : {
          removed_at: null
        };

    return {
      limit,
      offset,
      order,
      orientation,
      where,
      raw: true
    };
  }
};
