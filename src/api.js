import forge, { configs } from 'mappersmith'
import EncodeJSON from 'mappersmith/middlewares/encode-json'

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
