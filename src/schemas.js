import { schema } from 'normalizr';

export const photo = new schema.Entity('photos');
export const photoList = new schema.Array(photo);
