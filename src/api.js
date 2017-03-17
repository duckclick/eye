import Promise from 'promise'
import forge, { configs } from 'mappersmith'
import EncodeJSON from 'mappersmith/middlewares/encode-json'

configs.Promise = Promise
configs.gatewayConfigs.XHR = {
  withCredentials: true
}

export default forge({
  host: WING_HOST,
  middlewares: [ EncodeJSON ],
  resources: {
    Wing: {
      trackDOM: { method: 'post', path: '/' }
    }
  }
})
