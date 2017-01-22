import forge, { configs } from 'mappersmith'
import EncodeJSON from 'mappersmith/middlewares/encode-json'

configs.gatewayConfigs.XHR = {
  withCredentials: true
}

const manifest = {
  host: '//localhost:7273',
  middlewares: [ EncodeJSON ],
  resources: {
    Wing: {
      trackDOM: { method: 'post', path: '/' }
    }
  }
}

export default forge(manifest)
