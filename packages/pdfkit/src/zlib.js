import zlib from 'zlib';
import { zlibSync } from 'fflate';

export default {
  deflateSync: (data) =>
    BROWSER ? Buffer.from(zlibSync(data)) : zlib.deflateSync(data),
};
