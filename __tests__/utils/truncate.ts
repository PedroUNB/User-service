/* eslint-disable security/detect-object-injection */
import { sequelize } from '@db/sequelize';

export default function truncate() {
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
}
