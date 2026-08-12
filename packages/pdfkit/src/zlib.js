import zlib from 'zlib';
import { zlibSync } from 'fflate';

export default {
  deflateSync: (data) => (BROWSER ? zlibSync(data) : zlib.deflateSync(data)),
};
