import { v4 as uuidv4 } from 'uuid';

const generateIds = (count = 1) => Array.from({ length: count }, () => uuidv4());

export default generateIds;
